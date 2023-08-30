import {
  ChevronLeft,
  HeartFill,
  Heart,
  Magnify,
  Menu,
  Play,
  StarEmpty,
  StarFill,
  Stars,
} from '../../../assets/svg';

const icon = {
  ChevronLeft,
  HeartFill,
  Heart,
  Magnify,
  Menu,
  Play,
  StarEmpty,
  StarFill,
  Stars,
};

export const Icon = ({name, ...rest}) => {
  const IconComponent = icon[name];

  if (!IconComponent) {
    console.error(`Icon ${name} does not exist`);
    return null;
  }

  return <IconComponent {...rest} />;
};
