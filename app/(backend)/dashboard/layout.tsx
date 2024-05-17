interface IProps {
  children: React.ReactNode;
}

const layout = ({ children }: IProps) => {
  return (
    <>
      <h1>Dashboard</h1>
      <main>{children}</main>
    </>
  );
};

export default layout;
