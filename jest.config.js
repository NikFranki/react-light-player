module.exports = {
    transform: {
        '^.+\\.(js|jsx|mjs)$': `<rootDir>/node_modules/babel-jest`,
    },
    testPathIgnorePatterns: [
        `<rootDir>/examples/`,
        `<rootDir>/node_modules/`,
        `<rootDir>/webpack.npm.test.js`
    ], //转换时需忽略的文件
    testURL: 'http://localhost/', // 运行环境下的URl,
    coveragePathIgnorePatterns: ['/node_modules/', '<rootDir>/src/index.jsx'], // 统计覆盖信息时需要忽略的文件
    moduleNameMapper: { // 需要mock处理掉的文件，比如样式文件 },
        testMatch: [ // 匹配的测试文件
            '<rootDir>/test/**/?(*.)(spec|test).{js,jsx,mjs}',
            '<rootDir>/src/**/__tests__/**/*.{js,jsx,mjs}',
        ],
    }
};
