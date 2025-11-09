const SwiperInfo = ({ image }) => {
  return (
    <div>
      <div
        className="bg-cover bg-center h-[600px]"
        style={{ backgroundImage: `url(${image})` }}
      ></div>
    </div>
  );
};

export default SwiperInfo;
