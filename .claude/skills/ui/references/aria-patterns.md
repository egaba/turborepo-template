# ARIA Patterns

Semantic HTML and ARIA roles for accessible React components with DaisyUI and TailwindCSS.

## Semantic HTML First

Always prefer semantic elements over ARIA roles on generic elements:

| Instead of                | Use              |
| ------------------------- | ---------------- |
| `<div role="button">`     | `<button>`       |
| `<div role="navigation">` | `<nav>`          |
| `<div role="main">`       | `<main>`         |
| `<div role="dialog">`     | `<dialog>`       |
| `<span role="link">`      | `<a>`            |
| `<div role="list">`       | `<ul>` or `<ol>` |

## ARIA for Common Patterns

### Toggle / Switch

```tsx
<label className="label cursor-pointer gap-2">
  <span className="label-text">Dark mode</span>
  <input
    type="checkbox"
    className="toggle"
    role="switch"
    aria-checked={isEnabled}
    onChange={handleToggle}
  />
</label>
```

### Expandable / Accordion

```tsx
<button
  aria-expanded={isOpen}
  aria-controls="panel-content"
  onClick={() => setIsOpen(!isOpen)}
>
  {title}
</button>
<div id="panel-content" role="region" hidden={!isOpen}>
  {children}
</div>
```

### Live Regions (Toast / Alert)

```tsx
<div role="alert" aria-live="assertive" className="alert alert-error">
  <span>Form submission failed. Please try again.</span>
</div>

<div aria-live="polite" className="alert alert-info">
  <span>3 items updated successfully.</span>
</div>
```

Use `aria-live="assertive"` for errors and urgent messages. Use `aria-live="polite"` for non-urgent status updates.

### Tabs

```tsx
;<div role="tablist" className="tabs tabs-boxed">
  {tabs.map((tab, i) => (
    <button
      key={tab.id}
      role="tab"
      aria-selected={activeTab === tab.id}
      aria-controls={`panel-${tab.id}`}
      className={`tab ${activeTab === tab.id ? 'tab-active' : ''}`}
      onClick={() => setActiveTab(tab.id)}
    >
      {tab.label}
    </button>
  ))}
</div>
{
  tabs.map((tab) => (
    <div
      key={tab.id}
      id={`panel-${tab.id}`}
      role="tabpanel"
      aria-labelledby={`tab-${tab.id}`}
      hidden={activeTab !== tab.id}
    >
      {tab.content}
    </div>
  ))
}
```
