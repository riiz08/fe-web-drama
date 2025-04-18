import NativeAdsterra from "./AdsterraNative";
import Drama from "./Drama";
import DramaLatestUpdate from "./DramaLatestUpdate";
import Komedi from "./Komedi";

const DramaSection = () => {
  return (
    <>
      <DramaLatestUpdate />
      <NativeAdsterra />
      <Drama />
      <NativeAdsterra />
      <Komedi />
    </>
  );
};

export default DramaSection;
