class Shared::Navbar < Bridgetown::Component
  def initialize(metadata:, resource: nil)
    @metadata = metadata
    @resource = resource
  end

  def current_lang
    @resource&.data&.lang || "en"
  end

  def current_path
    @resource&.relative_url&.sub(%r{/$}, "") || ""
  end

  def translations
    helpers.site.data.i18n[current_lang] || helpers.site.data.i18n["en"]
  end

  def home_url
    current_lang == "fi" ? "/fi/" : "/"
  end

  def nav_items
    prefix = current_lang == "fi" ? "/fi" : ""
    t = translations
    [
      [t["navigation"]["home"], home_url],
      [t["navigation"]["about"], current_lang == "fi" ? "/fi/tietoa/" : "/about/"],
      [t["navigation"]["services"], current_lang == "fi" ? "/fi/palvelut/" : "/services/"],
      [t["navigation"]["contact"], current_lang == "fi" ? "/fi/yhteystiedot/" : "/contact/"],
    ]
  end

  def language_switch_url
    current_lang == "fi" ? "/" : "/fi/"
  end
end
