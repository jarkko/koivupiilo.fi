# Finnish joins a word to a multi-word first part with a space and a hyphen:
# "beach volley -kartta", "hallit ja -kentät". A browser may break the line
# right after that hyphen and leave it dangling. A word joiner (U+2060) after
# the hyphen keeps it with its word, so the copy in src/_data stays plain text.
class Builders::WordJoiner < SiteBuilder
  COPY = %w[copy work jarkko].freeze
  LEADING_HYPHEN = /(?<=\s)-(?=\p{L})/

  def build
    hook :site, :post_read do |site|
      COPY.each { |name| site.data[name] = join(site.data[name]) }
    end
  end

  private

  def join(value)
    case value
    when String then value.gsub(LEADING_HYPHEN, "-⁠")
    when Array then value.map { |item| join(item) }
    when Hash then value.each_with_object(value.class.new) { |(key, item), out| out[key] = join(item) }
    else value
    end
  end
end
