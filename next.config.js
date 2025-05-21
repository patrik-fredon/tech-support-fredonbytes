/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	webpack: (config) => {
		config.module.rules.push({
			test: /\.svg$/,
			use: ['@svgr/webpack']
		});
		config.module.rules.push({
			test: /\.md$/,
			type: 'asset/source'
		});
		return config;
	},
	// Enable reading files from public directory
	pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],

	// Dočasně vypnuto přesměrování - používáme middleware.ts
	// async redirects() {
	// 	return [
	// 		{
	// 			source: '/terms',
	// 			destination: '/terms-static',
	// 			permanent: false
	// 		},
	// 		{
	// 			source: '/privacy',
	// 			destination: '/privacy-static',
	// 			permanent: false
	// 		}
	// 	];
	// }
};

module.exports = nextConfig;
