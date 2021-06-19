import './layout.css';

type LayoutProps = {
  header?: string;
  content: React.ReactNode;
};

const Layout = (props: LayoutProps) => {
  return (
    <main>
      {props.header ? <h1>{props.header}</h1> : null}
      <div>{props.content}</div>
    </main>
  );
};

export { Layout };
