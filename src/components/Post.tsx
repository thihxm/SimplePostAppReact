import { format, formatDistanceToNow } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'

import { Avatar } from './Avatar'
import { Comment } from './Comment'
import styles from './Post.module.css'

interface PostProps {
  author : {
    avatarUrl: string
    name: string
    role: string
  }
  publishedAt: Date
  content: {
    type: string,
    content: string,
  }[],
  tags?: string[],
}

export function Post({
  author,
  publishedAt,
  content,
  tags,
}: PostProps) {
  const publishedAtFormatted = format(publishedAt, "d 'de' LLLL 'às' HH:mm'h'", { locale: ptBR })
  const publishedAtRealtiveToNow = formatDistanceToNow(publishedAt, { locale: ptBR, addSuffix: true })

  return (
    <article className={styles.post}>
      <header className={styles.header}>
        <Avatar src={author.avatarUrl} />

        <div className={styles.authorInfo}>
          <strong>{author.name}</strong>
          <span>{author.role}</span>
        </div>
      
        <time
          title={publishedAtFormatted}
          dateTime={publishedAt.toISOString()}
        >
          {publishedAtRealtiveToNow}
        </time>
      </header>
      
      <div className={styles.content}>
        {content.map(({ type, content }) => {
          if (type === 'paragraph') {
            return <p>{content}</p>
          }

          if (type === 'link') {
            return <a href='#'>{content}</a>
          }
        })}
        
        {tags && (
          <p>
            {
              tags.map(tag => (
                <>
                  <a key={tag} href={`${tag}`}>{tag}</a>
                  {' '}
                </>
              ))
            }
          </p>
        )}
      </div>

      <form className={styles.commentForm}>
        <strong>Deixe seu feedback</strong>

        <textarea placeholder='Escreva um comentário...' />
  
        <footer>
          <button type="submit">Publicar</button>
        </footer>
      </form>

      <div className={styles.commentList}>
        <Comment />
        <Comment />
        <Comment />
      </div>
    </article>
  )
}