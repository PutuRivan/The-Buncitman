interface Props {
  name: string;
  position: string;
  image: string;
}

const Team = ({ name, position, image }: Props) => {
  return (
    <div className="flex flex-col items-center w-96 gap-3">
      <img src={image} alt={name} className="circular-image" />
      <h3 className="text-Heading-4 text-blue-500 font-semibold">{name}</h3>
      <p className="text-Heading-5 text-red-800">{position}</p>
    </div>
  );
};

export default Team;