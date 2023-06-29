import NextLink from "next/link";

export default function Link({ href, children, useFunctionalComponent = false }) {
    return (
      <NextLink style={{textDecoration: 'none', color: '#000000DE'}} href={href} legacyBehavior={useFunctionalComponent} passHref={useFunctionalComponent}>{children}</NextLink>
    );
}