interface HeadingProps {
  title: string | null;
}

const Heading: React.FC<HeadingProps> = ({ title }) => {
  return (
    <div className="mt-4 flex items-center gap-4">
      <h2 className="font-semibold text-medium md:text-2xl whitespace-nowrap">
        {title}
      </h2>
      <hr className="border-5 md:border-8 flex-grow" />
    </div>
  );
};

export default Heading;
