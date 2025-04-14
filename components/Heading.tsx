interface HeadingProps {
  title: string | null;
}

const Heading: React.FC<HeadingProps> = ({ title }) => {
  return (
    <div className="mt-4 flex items-center gap-4 w-full">
      <hr className="flex-grow border-t border-5 md:border-8" />
      <h2 className="font-semibold text-medium md:text-2xl whitespace-nowrap">
        {title}
      </h2>
      <hr className="flex-grow border-t border-5 md:border-8" />
    </div>
  );
};

export default Heading;
