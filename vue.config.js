module.exports = {
	lintOnSave: "warning",
	chainWebpack: (config) => {
		if (process.env.NODE_ENV === "development") {
			config.output.filename("[name].[hash].js").end();
		}
		config.plugins.delete("hmr");
	},
};
