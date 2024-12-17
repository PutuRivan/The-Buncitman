import Image from "next/image";

interface Props {
  name: string;
  position: string;
  image: string;
  className?: string; 
}

const Team = ({ name, position, image }: Props) => {
  return (
    <div className="flex flex-col items-center w-96 gap-3">
      <Image width={80} height={80} src={image} alt={name} className="circular-image" />
      <h3 className="text-Heading-4 font-semibold">{name}</h3>
      <p className="text-Heading-5">{position}</p>
    </div>
  );
};

export default Team;
