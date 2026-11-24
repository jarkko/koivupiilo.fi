from pathlib import Path
from PIL import Image, ImageDraw
import subprocess, hashlib, json, io
root=Path('docs/design/reviews/evidence/405a839d'); (root/'sheets').mkdir(exist_ok=True)
paths=subprocess.check_output(['git','diff','--no-renames','--name-status','origin/main','--','docs/design/baselines']).decode().splitlines()
manifest=[]
for row in paths:
    status,path=row.split('\t'); p=Path(path)
    data=subprocess.check_output(['git','show','origin/main:'+path]) if status=='D' else p.read_bytes()
    manifest.append(dict(path=path,status=status,sha256='deleted' if status=='D' else hashlib.sha256(data).hexdigest(),image_sha256=hashlib.sha256(data).hexdigest()))
dirs=sorted({str(Path(x['path']).parent) for x in manifest if x['status']!='D'})
for folder in dirs:
    folder=Path(folder); name=str(folder.relative_to('docs/design/baselines')).replace('/','-')
    ims=[]
    for size in ['desktop','phone']:
        for theme in ['light','dark']:
            p=folder/f'{size}-{theme}-fi-FI.png'; twin=folder/f'{size}-{theme}-en-GB.png'
            assert p.read_bytes()==twin.read_bytes(),(p,twin)
            im=Image.open(p).convert('RGB'); w=720 if size=='desktop' else 390
            im=im.resize((w,round(im.height*w/im.width))); ims.append((p.name,im))
    sheet=Image.new('RGB',(sum(im.width for _,im in ims),max(im.height for _,im in ims)+40),'#999999'); draw=ImageDraw.Draw(sheet); x=0
    for label,im in ims:draw.text((x+5,8),label,fill='black');sheet.paste(im,(x,40));x+=im.width
    sheet.save(root/'sheets'/f'{name}.jpg',quality=94)
    # Compare previous vs present in light, including old routes being removed.
    oldfolder=str(folder).replace('/tuotteet','/tyot').replace('/en/products','/en/work')
    ims=[]
    for size in ['desktop','phone']:
        old=Image.open(io.BytesIO(subprocess.check_output(['git','show',f'origin/main:{oldfolder}/{size}-light-fi-FI.png']))).convert('RGB')
        new=Image.open(folder/f'{size}-light-fi-FI.png').convert('RGB')
        for label,im in [('before',old),('after',new)]:
            w=600 if size=='desktop' else 390;im=im.resize((w,round(im.height*w/im.width)));ims.append((f'{size} {label}',im))
    sheet=Image.new('RGB',(sum(im.width for _,im in ims),max(im.height for _,im in ims)+40),'#999999');draw=ImageDraw.Draw(sheet);x=0
    for label,im in ims:draw.text((x+5,8),label,fill='black');sheet.paste(im,(x,40));x+=im.width
    sheet.save(root/'sheets'/f'{name}-comparison.jpg',quality=94)
(root/'baseline-manifest.json').write_text(json.dumps(manifest,indent=2)+'\n')
print(json.dumps({'baseline_changes':len(manifest),'present':sum(x['status']!='D' for x in manifest),'deleted':sum(x['status']=='D' for x in manifest),'sheets':len(dirs),'locale_pairs':'all byte-identical'}))
