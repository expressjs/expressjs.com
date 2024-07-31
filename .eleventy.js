const { EleventyI18nPlugin, EleventyHtmlBasePlugin } = require("@11ty/eleventy");
const { compareDesc } = require("date-fns");


/** @param {import("@11ty/eleventy").UserConfig} eleventyConfig */
module.exports = function(eleventyConfig) {
    eleventyConfig.addPassthroughCopy("css")
    eleventyConfig.addPassthroughCopy("js")
    eleventyConfig.addPassthroughCopy("images")
    eleventyConfig.addPassthroughCopy("fonts")

	eleventyConfig.addPlugin(EleventyHtmlBasePlugin);
    eleventyConfig.addPlugin(EleventyI18nPlugin, {
		defaultLanguage: "en",
	});

	eleventyConfig.addFilter("order", (array) => {
		if(!Array.isArray(array) || array.length === 0) {
			return [];
		}

		return array.sort((a,b) => compareDesc(a.page.date, b.page.date));
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
        htmlTemplateEngine: "liquid",
        dir: {
            includes: "_includes",
            layouts: "_layouts",
            data: "_data",
            output: "dist",
        },
        pathPrefix: "/",
    }
}