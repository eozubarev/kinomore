import {RoutesEnum} from '@/constants/routes'
import {FiFilm, FiMenu, FiHome, FiTv, FiHeart, FiX} from 'react-icons/fi'
import {BiMovie} from 'react-icons/bi'
import {useRouter} from 'next/router'
import {Search} from '@/components/Search/Search'
import {useEffect, useRef, useState} from 'react'
import {useOnClickOutside} from 'usehooks-ts'
import {Logo} from '@/components/Logo/Logo'
import {Device} from '@/components/Device'
import styles from './Header.module.scss'
import classNames from 'classnames'
import Link from 'next/link'

export const Header = () => {

    const ref = useRef(null)
    const router = useRouter()
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(!open)
    }

    useOnClickOutside(ref, () => setOpen(false))

    const items = [
        {icon: <FiHome />, href: RoutesEnum.Home, text: 'Главная'},
        {icon: <FiFilm />, href: RoutesEnum.Films, text: 'Фильмы'},
        {icon: <FiTv />, href: RoutesEnum.Series, text: 'Сериалы'},
        {icon: <BiMovie />, href: RoutesEnum.Cartoons, text: 'Мультфильмы'},
        {icon: <FiHeart />, href: RoutesEnum.Favourites, text: 'Избранное'}
    ]

    useEffect(() => {
        router.events.on("routeChangeComplete", () => setOpen(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <header className={styles.header}>
            <div className={classNames('container', styles.container)}>
                <div ref={ref} className={styles.menu}>
                    <button
                        className={classNames('btn-reset', styles.burger)}
                        onClick={handleOpen}
                    >
                        {open ? <FiX /> : <FiMenu /> }
                    </button>
                    <Logo className={styles.logo} />
                    <div className={classNames(styles.dropdown, open && styles.dropdownOpen)}>
                        <ul className={classNames('list-reset', styles.dropdownList)}>
                            {items.map(el => (
                                <li key={el.text} className={styles.dropdownItem}>
                                    <Link href={el.href}>
                                        <a className={classNames(styles.dropdownLink, router.pathname === el.href && styles.dropdownLinkActive)}>
                                            {el.icon}
                                            {el.text}
                                        </a>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <Device mobile>
                        <Link href="/auth">
                            <a className={classNames(styles.link, styles.menuLink)}>Войти</a>
                        </Link>
                    </Device>
                </div>
                <Search />
                <Link href="/auth">
                    <a className={styles.link}>Войти</a>
                </Link>
            </div>
        </header>
    )
}
