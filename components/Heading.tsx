interface HeadingProps {
  text: string | null;
}

const Heading: React.FC<HeadingProps> = ({ text }) => {
  return (
    <div className="mt-4 w-full">
      <h2 className="font-semibold text-medium md:text-2xl whitespace-nowrap">
        {text}
      </h2>
    </div>
  );
};

export default Heading;
