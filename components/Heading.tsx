interface HeadingProps {
  title: string | null;
}

const Heading: React.FC<HeadingProps> = ({ title }) => {
  return (
    <div className="mt-4 w-full">
      <h2 className="font-semibold text-medium md:text-2xl whitespace-nowrap">
        {title}
      </h2>
    </div>
  );
};

export default Heading;
