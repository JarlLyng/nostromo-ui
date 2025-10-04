import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../lib/utils';

// Import commonly used Phosphor icons
import {
  // Navigation
  House,
  User,
  Gear,
  MagnifyingGlass,
  List,
  X,
  CaretLeft,
  CaretRight,
  CaretUp,
  CaretDown,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  ArrowDown,
  
  // Actions
  Plus,
  Minus,
  Check,
  X as XIcon,
  Trash,
  PencilSimple,
  Copy,
  Download,
  Upload,
  Share,
  Heart,
  Star,
  Bookmark,
  
  // Communication
  Envelope,
  Phone,
  ChatCircle,
  Bell,
  BellSlash,
  
  // Media
  Play,
  Pause,
  Stop,
  SpeakerHigh,
  SpeakerLow,
  SpeakerX,
  Camera,
  Image,
  VideoCamera,
  
  // Files
  File,
  Folder,
  FolderOpen,
  FileText,
  FilePdf,
  FileImage,
  
  // Status
  CheckCircle,
  XCircle,
  Warning,
  Info,
  Question,
  
  // Time
  Clock,
  Calendar,
  Timer,
  
  // Security
  Lock,
  LockOpen,
  Eye,
  EyeSlash,
  Shield,
  ShieldCheck,
  
  // Technology
  WifiHigh,
  WifiX,
  BatteryWarning,
  Cpu,
  HardDrive,
  
  // Weather
  Sun,
  Moon,
  Cloud,
  CloudRain,
  CloudSnow,
  CloudLightning,
  
  // Social
  GithubLogo,
  TwitterLogo,
  FacebookLogo,
  InstagramLogo,
  LinkedinLogo,
  YoutubeLogo,
  
  // Shopping
  ShoppingCart,
  ShoppingBag,
  CreditCard,
  Money,
  
  // Health
  Heart as HeartIcon,
  Activity,
  
  // Transportation
  Car,
  Bus,
  Train,
  Airplane,
  Boat,
  Bicycle,
  
  // Food
  Coffee,
  Pizza,
  Hamburger,
  
  // Sports
  Basketball,
  Football,
  SoccerBall,
  TennisBall,
  
  // Music
  MusicNote,
  PlayCircle,
  PauseCircle,
  StopCircle,
  
  // Education
  Book,
  BookOpen,
  GraduationCap,
  Lightbulb,
  
  // Business
  Briefcase,
  Buildings,
  ChartLine,
  ChartBar,
  ChartPie,
  
  // Tools
  Wrench,
  PaintBrush,
  
  // Nature
  Tree,
  Flower,
  Leaf,
  Mountains,
  
  // Space
  Rocket,
  Planet,
  Star as StarIcon,
  Moon as MoonIcon,
  
  // Gaming
  GameController,
  PuzzlePiece,
  
  // Miscellaneous
  Gift,
  Key,
  MapPin,
  Compass,
  Flag,
  Trophy,
  Medal,
  Crown,
  Sparkle,
  Lightning,
  Fire,
  Snowflake,
  Umbrella,
  Anchor,
  Bug,
  Butterfly,
  Cat,
  Dog,
  Fish,
  Bird,
  PawPrint,
  
  // Nostromo themed
  Alien,
  Rocket as Spaceship,
  Atom,
  Flask,
  TestTube,
  Syringe,
  Pill,
  Skull,
  Ghost,
  Scroll,
  Bookmark as BookmarkIcon,
  Compass as CompassIcon,
  Flag as FlagIcon,
  Trophy as TrophyIcon,
  Medal as MedalIcon,
  Crown as CrownIcon,
  Sparkle as SparkleIcon,
  Lightning as ZapIcon,
  Fire as FireIcon,
  Snowflake as SnowflakeIcon,
  Umbrella as UmbrellaIcon,
  Anchor as AnchorIcon,
  Bug as BugIcon,
  Butterfly as ButterflyIcon,
  Cat as CatIcon,
  Dog as DogIcon,
  Fish as FishIcon,
  Bird as BirdIcon,
  PawPrint as PawPrintIcon,
} from 'phosphor-react';

// Create a mapping of icon names to components
const iconMap: Record<string, React.ComponentType<any>> = {
  // Navigation
  house: House,
  user: User,
  settings: Gear,
  search: MagnifyingGlass,
  menu: List,
  x: X,
  'chevron-left': CaretLeft,
  'chevron-right': CaretRight,
  'chevron-up': CaretUp,
  'chevron-down': CaretDown,
  'arrow-left': ArrowLeft,
  'arrow-right': ArrowRight,
  'arrow-up': ArrowUp,
  'arrow-down': ArrowDown,
  
  // Actions
  plus: Plus,
  minus: Minus,
  check: Check,
  'x-icon': XIcon,
  trash: Trash,
  edit: PencilSimple,
  copy: Copy,
  download: Download,
  upload: Upload,
  share: Share,
  heart: Heart,
  star: Star,
  bookmark: Bookmark,
  
  // Communication
  mail: Envelope,
  phone: Phone,
  'message-circle': ChatCircle,
  bell: Bell,
  'bell-slash': BellSlash,
  
  // Media
  play: Play,
  pause: Pause,
  stop: Stop,
  'volume-high': SpeakerHigh,
  'volume-low': SpeakerLow,
  'volume-x': SpeakerX,
  camera: Camera,
  image: Image,
  video: VideoCamera,
  
  // Files
  file: File,
  folder: Folder,
  'folder-open': FolderOpen,
  'file-text': FileText,
  'file-pdf': FilePdf,
  'file-image': FileImage,
  
  // Status
  'check-circle': CheckCircle,
  'x-circle': XCircle,
  warning: Warning,
  info: Info,
  question: Question,
  
  // Time
  clock: Clock,
  calendar: Calendar,
  timer: Timer,
  
  // Security
  lock: Lock,
  'lock-open': LockOpen,
  eye: Eye,
  'eye-slash': EyeSlash,
  shield: Shield,
  'shield-check': ShieldCheck,
  
  // Technology
  wifi: WifiHigh,
  'wifi-slash': WifiX,
  'battery-warning': BatteryWarning,
  cpu: Cpu,
  'hard-drive': HardDrive,
  
  // Weather
  sun: Sun,
  moon: Moon,
  cloud: Cloud,
  'cloud-rain': CloudRain,
  'cloud-snow': CloudSnow,
  'cloud-lightning': CloudLightning,
  
  // Social
  github: GithubLogo,
  twitter: TwitterLogo,
  facebook: FacebookLogo,
  instagram: InstagramLogo,
  linkedin: LinkedinLogo,
  youtube: YoutubeLogo,
  
  // Shopping
  'shopping-cart': ShoppingCart,
  'shopping-bag': ShoppingBag,
  'credit-card': CreditCard,
  money: Money,
  
  // Health
  'heart-icon': HeartIcon,
  activity: Activity,
  
  // Transportation
  car: Car,
  bus: Bus,
  train: Train,
  plane: Airplane,
  ship: Boat,
  bicycle: Bicycle,
  
  // Food
  coffee: Coffee,
  pizza: Pizza,
  hamburger: Hamburger,
  
  // Sports
  basketball: Basketball,
  football: Football,
  soccer: SoccerBall,
  tennis: TennisBall,
  
  // Music
  'music-note': MusicNote,
  'play-circle': PlayCircle,
  'pause-circle': PauseCircle,
  'stop-circle': StopCircle,
  
  // Education
  book: Book,
  'book-open': BookOpen,
  'graduation-cap': GraduationCap,
  lightbulb: Lightbulb,
  
  // Business
  briefcase: Briefcase,
  building: Buildings,
  'chart-line': ChartLine,
  'chart-bar': ChartBar,
  'chart-pie': ChartPie,
  
  // Tools
  wrench: Wrench,
  'paint-brush': PaintBrush,
  
  // Nature
  tree: Tree,
  flower: Flower,
  leaf: Leaf,
  mountain: Mountains,
  
  // Space
  rocket: Rocket,
  planet: Planet,
  'star-icon': StarIcon,
  'moon-icon': MoonIcon,
  
  // Gaming
  'game-controller': GameController,
  puzzle: PuzzlePiece,
  
  // Miscellaneous
  gift: Gift,
  key: Key,
  'map-pin': MapPin,
  compass: Compass,
  flag: Flag,
  trophy: Trophy,
  medal: Medal,
  crown: Crown,
  sparkle: Sparkle,
  zap: Lightning,
  fire: Fire,
  snowflake: Snowflake,
  umbrella: Umbrella,
  anchor: Anchor,
  bug: Bug,
  butterfly: Butterfly,
  cat: Cat,
  dog: Dog,
  fish: Fish,
  bird: Bird,
  'paw-print': PawPrint,
  
  // Nostromo themed
  alien: Alien,
  spaceship: Spaceship,
  atom: Atom,
  flask: Flask,
  'test-tube': TestTube,
  syringe: Syringe,
  pill: Pill,
  skull: Skull,
  ghost: Ghost,
  scroll: Scroll,
  'bookmark-icon': BookmarkIcon,
  'compass-icon': CompassIcon,
  'flag-icon': FlagIcon,
  'trophy-icon': TrophyIcon,
  'medal-icon': MedalIcon,
  'crown-icon': CrownIcon,
  'sparkle-icon': SparkleIcon,
  'zap-icon': ZapIcon,
  'fire-icon': FireIcon,
  'snowflake-icon': SnowflakeIcon,
  'umbrella-icon': UmbrellaIcon,
  'anchor-icon': AnchorIcon,
  'bug-icon': BugIcon,
  'butterfly-icon': ButterflyIcon,
  'cat-icon': CatIcon,
  'dog-icon': DogIcon,
  'fish-icon': FishIcon,
  'bird-icon': BirdIcon,
  'paw-print-icon': PawPrintIcon,
} as const;

export type IconName = keyof typeof iconMap;

const iconVariants = cva('', {
  variants: {
    size: {
      xs: 'w-3 h-3',
      sm: 'w-4 h-4',
      md: 'w-5 h-5',
      lg: 'w-6 h-6',
      xl: 'w-8 h-8',
      '2xl': 'w-10 h-10',
      '3xl': 'w-12 h-12',
    },
    weight: {
      thin: '',
      light: '',
      regular: '',
      bold: '',
      fill: '',
      duotone: '',
    },
    color: {
      current: 'text-current',
      primary: 'text-blue-600',
      secondary: 'text-gray-600',
      success: 'text-green-600',
      warning: 'text-yellow-600',
      error: 'text-red-600',
      muted: 'text-gray-400',
    },
  },
  defaultVariants: {
    size: 'md',
    weight: 'regular',
    color: 'current',
  },
});

export interface IconProps
  extends Omit<React.HTMLAttributes<SVGSVGElement>, 'color'>,
    VariantProps<typeof iconVariants> {
  name: IconName;
  className?: string;
}

export const Icon = React.forwardRef<SVGSVGElement, IconProps>(
  ({ name, size, weight, color, className, ...props }, ref) => {
    const IconComponent = iconMap[name];
    
    if (!IconComponent) {
      console.warn(`Icon "${name}" not found in iconMap`);
      return null;
    }

    return (
      <IconComponent
        ref={ref}
        weight={weight as 'thin' | 'light' | 'regular' | 'bold' | 'fill' | 'duotone'}
        className={cn(iconVariants({ size, weight, color }), className)}
        {...props}
      />
    );
  }
);

Icon.displayName = 'Icon';

// Export icon names for TypeScript autocomplete
export const iconNames = Object.keys(iconMap) as IconName[];

// Export individual icons for direct import
export * from 'phosphor-react';
