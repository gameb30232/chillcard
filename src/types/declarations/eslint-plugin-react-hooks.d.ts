// src/types/declarations/eslint-plugin-react-hooks.d.ts
declare module 'eslint-plugin-react-hooks' {
  type RuleLevel = 'off' | 'warn' | 'error';
  type RuleConfig = RuleLevel | [RuleLevel, ...unknown[]];

  const plugin: {
    configs: {
      recommended: {
        rules: Record<string, RuleConfig>;
      };
    };
  };
  export default plugin;
}
