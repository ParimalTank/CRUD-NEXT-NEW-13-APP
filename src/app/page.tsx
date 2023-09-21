import { Button, Link } from '@mui/material'
import Image from 'next/image'
import styles from './page.module.css'

export default function Home() {
  return (
    <div className={styles.main}>
      <Button component={Link} href="/register" >Register</Button>
      <Button component={Link} href="/usersinfo" >Active User</Button>
    </div>
  )
}