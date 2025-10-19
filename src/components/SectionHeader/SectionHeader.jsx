import './SectionHeader.css';

export default function SectionHeader({ title, subtitle, align = 'center', id, ...rest }) {
  return (
    <div id={id} className={`section-header section-header-${align}`} {...rest}>
      <h2 className="section-title">{title}</h2>
      {subtitle && <p className="section-subtitle">{subtitle}</p>}
    </div>
  );
}
