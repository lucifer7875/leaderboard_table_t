import { Link } from "react-router";
import { IconChevronDown } from "@tabler/icons-react";
import { Button, buttonVariants } from "../custom/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/collapsible";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { cn } from "@/lib/utils";

import useCheckActiveNav from "@/hooks/use-check-active-nav";
import { SideLink } from "@/models/sidelinks";

/**
 * @interface NavProps
 * @property {boolean} isCollapsed - Indicates whether the navigation menu is collapsed or expanded.
 * @property {SideLink[]} links - Array of navigation link objects.
 * @property {function} closeNav - Callback function to handle closing of the navigation menu.
 */
interface NavProps extends React.HTMLAttributes<HTMLDivElement> {
  isCollapsed: boolean;
  links: SideLink[];
  closeNav: () => void;
}

/**
 * @memberof common
 * @name Nav
 * @description The `Nav` component renders a responsive and interactive navigation menu. It supports expandable/collapsible sections, tooltips, and dropdowns for nested navigation. The menu items are dynamically rendered based on the provided `links` prop and can display icons, labels, and submenus.
 * @interface NavProps props - The properties to be passed to the component.
 * @property {boolean} isCollapsed - Indicates whether the navigation menu is collapsed or expanded.
 * @property {SideLink[]} links - Array of navigation link objects, each containing title, href, icon, and optional sub-links.
 * @property {string} [className] - Additional class names for styling the navigation container.
 * @property {function} closeNav - Callback function to handle closing of the navigation menu.
 * @returns {JSX.Element} - The rendered `Nav` component.
 */
export default function Nav({
  links,
  isCollapsed,
  className,
  closeNav,
}: Readonly<NavProps>) {
  const renderLink = ({ sub, ...rest }: SideLink) => {
    const key = `${rest.title}-${rest.href}`;
    if (isCollapsed && sub)
      return (
        <NavLinkIconDropdown
          {...rest}
          sub={sub}
          key={key}
          closeNav={closeNav}
        />
      );

    if (isCollapsed)
      return <NavLinkIcon {...rest} key={key} closeNav={closeNav} />;

    if (sub)
      return (
        <NavLinkDropdown {...rest} sub={sub} key={key} closeNav={closeNav} />
      );

    return <NavLink {...rest} key={key} closeNav={closeNav} />;
  };
  return (
    <div
      data-collapsed={isCollapsed}
      className={cn(
        "group border-b py-2 transition-[max-height,padding] duration-500 data-[collapsed=true]:py-2 md:border-none",
        className
      )}
    >
      <TooltipProvider delayDuration={0}>
        <nav className="grid gap-1 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2">
          {links.map(renderLink)}
        </nav>
      </TooltipProvider>
    </div>
  );
}

interface NavLinkProps extends SideLink {
  subLink?: boolean;
  closeNav: () => void;
}

function NavLink({
  title,
  icon,
  label,
  href,
  closeNav,
  subLink = false,
}: NavLinkProps) {
  const { checkActiveNav } = useCheckActiveNav();
  return (
    <Link
      to={href}
      onClick={closeNav}
      className={cn(
        buttonVariants({
          variant: checkActiveNav(href, subLink) ? "accent" : "ghost",
          // variant: 'ghost',
          size: "sm",
        }),
        "h-12 justify-start text-wrap rounded-none px-6 text-inherit",
        subLink && "h-10 w-full px-2"
      )}
      aria-current={checkActiveNav(href) ? "page" : undefined}
    >
      <div className="mr-2">{icon}</div>
      {title}
      {label && (
        <div className="ml-2 rounded-lg bg-primary px-1 text-[0.625rem] text-primary-foreground">
          {label}
        </div>
      )}
    </Link>
  );
}

function NavLinkDropdown({ title, icon, label, sub, closeNav }: NavLinkProps) {
  const { checkActiveNav } = useCheckActiveNav();

  /* Open collapsible by default
   * if one of child element is active */
  const isChildActive = !!sub?.find((s) => checkActiveNav(s.href, true));

  return (
    <Collapsible defaultOpen={isChildActive}>
      <CollapsibleTrigger
        className={cn(
          buttonVariants({ variant: "ghost", size: "sm" }),
          "group h-12 w-full justify-start rounded-none px-6"
        )}
      >
        <div className="mr-2">{icon}</div>
        {title}
        {label && (
          <div className="ml-2 rounded-lg bg-primary px-1 text-[0.625rem] text-primary-foreground">
            {label}
          </div>
        )}
        <span
          className={cn(
            'ml-auto transition-all group-data-[state="open"]:-rotate-180'
          )}
        >
          <IconChevronDown stroke={1} />
        </span>
      </CollapsibleTrigger>
      <CollapsibleContent className="collapsibleDropdown" asChild>
        <ul>
          {sub!.map((sublink) => (
            <li key={sublink.title} className="my-1 ml-8">
              <NavLink {...sublink} subLink closeNav={closeNav} />
            </li>
          ))}
        </ul>
      </CollapsibleContent>
    </Collapsible>
  );
}

function NavLinkIcon({ title, icon, label, href }: NavLinkProps) {
  const { checkActiveNav } = useCheckActiveNav();
  return (
    <Tooltip delayDuration={0}>
      <TooltipTrigger asChild>
        <Link
          to={href}
          className={cn(
            buttonVariants({
              variant: checkActiveNav(href) ? "accent" : "ghost",
              size: "icon",
            }),
            "h-12 w-12"
          )}
        >
          {icon}
          <span className="sr-only">{title}</span>
        </Link>
      </TooltipTrigger>
      <TooltipContent side="right" className="flex items-center gap-4">
        {title}
        {label && (
          <span className="ml-auto text-muted-foreground">{label}</span>
        )}
      </TooltipContent>
    </Tooltip>
  );
}

function NavLinkIconDropdown({ title, icon, label, sub }: NavLinkProps) {
  const { checkActiveNav } = useCheckActiveNav();

  /* Open collapsible by default
   * if one of child element is active */
  const isChildActive = !!sub?.find((s) => checkActiveNav(s.href, true));

  return (
    <DropdownMenu>
      <Tooltip delayDuration={0}>
        <TooltipTrigger asChild>
          <DropdownMenuTrigger asChild>
            <Button
              variant={isChildActive ? "accent" : "ghost"}
              size="icon"
              className="h-12 w-12"
            >
              {icon}
            </Button>
          </DropdownMenuTrigger>
        </TooltipTrigger>
        <TooltipContent side="right" className="flex items-center gap-4">
          {title}{" "}
          {label && (
            <span className="ml-auto text-muted-foreground">{label}</span>
          )}
          <IconChevronDown
            size={18}
            className="-rotate-90 text-muted-foreground"
          />
        </TooltipContent>
      </Tooltip>
      <DropdownMenuContent side="right" align="start" sideOffset={4}>
        <DropdownMenuLabel>
          {title} {label ? `(${label})` : ""}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {sub!.map(({ title, icon, label, href }) => (
          <DropdownMenuItem key={`${title}-${href}`} asChild>
            <Link
              to={href}
              className={`${checkActiveNav(href, true) ? "bg-accent" : ""}`}
            >
              {icon} <span className="ml-2 max-w-52 text-wrap">{title}</span>
              {label && <span className="ml-auto text-xs">{label}</span>}
            </Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
