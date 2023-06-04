import NextLink from "next/link";

export default function Link({ href, children }) {
    return (
      <NextLink style={{textDecoration: 'none', color: '#000000DE'}} href={href}>{children}</NextLink>
    );
}