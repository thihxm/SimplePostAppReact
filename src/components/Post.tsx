import styles from './Post.module.css'

export function Post() {
  return (
    <article className={styles.post}>
      <header className={styles.header}>
        <img className={styles.avatar} src="https://github.com/thihxm.png" />
        <div className={styles.authorInfo}>
          <strong>Thiago Medeiros</strong>
          <span>Web Developer</span>
        </div>
      
        <time title='25 de julho de 2022 às 22:00h' dateTime='2022-06-25 22:00:00'>Publicado há 1h</time>
      </header>
      
      <div className={styles.content}>
        <p>Fala galeraa 👋</p>
        
        <p>Acabei de subir mais um projeto no meu portifa. É um projeto que fiz no NLW Return, evento da Rocketseat. O nome do projeto é DoctorCare 🚀</p>
        
        <p>👉{' '}<a href='#'>jane.design/doctorcare</a></p>
        
        <p>
          <a href='#'>#novoprojeto</a>{' '}
          <a href='#'>#nlw</a>{' '}
          <a href='#'>#rocketseat</a>
        </p>
      </div>

      <form className={styles.commentForm}>
        <strong>Deixe seu feedback</strong>

        <textarea placeholder='Escreva um comentário...' />
  
        <footer>
          <button type="submit">Publicar</button>
        </footer>
      </form>
    </article>
  )
}