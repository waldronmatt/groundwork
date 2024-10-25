export interface TemplateIdProperty {
  get templateIdGetter(): HTMLTemplateElement | null;
  set templateIdSetter(value: string);
}
