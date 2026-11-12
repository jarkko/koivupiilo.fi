# Site-wide settings. Not reloaded by `bin/bridgetown start`; restart after a change.
# Company facts and copy live in src/_data/.

Bridgetown.configure do |_config|
  url "https://koivupiilo.fi"

  template_engine "erb"

  timezone "Europe/Helsinki"

  # Every page sets its own permalink: Finnish at the root, English under /en/
  # with translated slugs (docs/design/model.md D3, strategy.md §5).
  permalink "pretty"
end
