require "bridgetown"

Bridgetown.load_tasks

# Run rake without specifying any command to execute a deploy build by default.
task default: :deploy

#
# Standard set of tasks, which you can customize if you wish:
#
desc "Build the Bridgetown site for deployment"
task :deploy => [:clean, "frontend:build"] do
  Bridgetown::Commands::Build.start
end

desc "Build the site for GitHub Pages: the deploy build without the design kit's markup"
task :publish => :deploy do
  # data-ds-allow records why a design check is waived. The ds gate reads it in output/, so the
  # deploy build keeps it; only the published copy drops it (visitors have no use for it).
  Dir.glob("output/**/*.html").each do |path|
    html = File.read(path)
    stripped = html.gsub(/\s+data-ds-allow="[^"]*"/, "")
    File.write(path, stripped) unless stripped == html
  end
  left = Dir.glob("output/**/*.html").select { |path| File.read(path).include?("data-ds-allow") }
  abort "data-ds-allow left in: #{left.join(", ")}" unless left.empty?
end

desc "Build the site in a test environment"
task :test do
  ENV["BRIDGETOWN_ENV"] = "test"
  Bridgetown::Commands::Build.start
end

desc "Runs the clean command"
task :clean do
  Bridgetown::Commands::Clean.start
end

namespace :frontend do
  desc "Build the frontend with esbuild for deployment"
  task :build do
    sh "npm run esbuild"
  end

  desc "Watch the frontend with esbuild during development"
  task :dev do
    sh "npm run esbuild-dev"
  rescue Interrupt
  end
end

#
# Add your own Rake tasks here! You can use `environment` as a prerequisite
# in order to write automations or other commands requiring a loaded site.
#
# task :my_task => :environment do
#   puts site.root_dir
#   automation do
#     say_status :rake, "I'm a Rake tast =) #{site.config.url}"
#   end
# end
