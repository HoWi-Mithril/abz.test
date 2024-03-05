import "./_links.scss"

const linkList = [
    {
        href: '#users',
        label: 'Users'
    },
    {
        href: '#sign-up',
        label: 'Sign up'
    }
]

const Links = () => {
    return (
        <nav>
            <ul className={'flex-wrapper'}>
                {linkList.map( link => (
                    <li key={link.label}>
                        <a href={link.href} className={'nav-link'}>{link.label}</a>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default Links;