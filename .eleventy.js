const { EleventyI18nPlugin } = require("@11ty/eleventy");

/** @param {import("@11ty/eleventy").UserConfig} eleventyConfig */
module.exports = function(eleventyConfig) {
    eleventyConfig.addPassthroughCopy("css")
    eleventyConfig.addPassthroughCopy("js")
    eleventyConfig.addPassthroughCopy("images")
    eleventyConfig.addPassthroughCopy("fonts")

    eleventyConfig.addPlugin(EleventyI18nPlugin, {
		defaultLanguage: "en",
	});

    eleventyConfig.setFrontMatterParsingOptions({
        excerpt: true,
        excerpt_separator: "<!-- excerpt -->",
	});

    eleventyConfig.setLiquidOptions({
        jekyllInclude: true
    })

    return {
        templateFormats: [
			"md",
			"html",
            "liquid"
		],
        dir: {
            includes: "_includes",
            layouts: "_layouts",
            data: "_data",
            output: "dist",
        },
        pathPrefix: "/",
    }
}