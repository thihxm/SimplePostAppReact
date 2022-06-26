import { format, formatDistanceToNow } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'
import { ThumbsUp, Trash } from 'phosphor-react'

import { Avatar } from './Avatar'
import styles from './Comment.module.css'

interface CommentProps {
  author: {
    avatarUrl: string
    name: string
  }
  publishedAt: Date
  content: string
}

export function Comment({ author, publishedAt, content }: CommentProps) {
  const publishedAtFormatted = format(publishedAt, "d 'de' LLLL 'às' HH:mm'h'", { locale: ptBR })
  
  const publishedAtRealtiveToNow = formatDistanceToNow(publishedAt, { locale: ptBR, addSuffix: true })
  
  return (
    <div className={styles.comment}>
      <Avatar hasBorder={false} src={author.avatarUrl} />

      <div className={styles.commentBox}>
        <div className={styles.commentContent}>
          <header>
            <div className={styles.authorAndTime}>
              <strong>{author.name}</strong>
              <time title={publishedAtFormatted} dateTime={publishedAt.toISOString()}>{publishedAtRealtiveToNow} </time>
            </div>

            <button title='Deletar comentário'>
              <Trash size={24} />
            </button>
          </header>

          <p>{content}</p>
        </div>

        <footer>
          <button>
            <ThumbsUp size={20} />
            Aplaudir <span>10</span>
          </button>
        </footer>
      </div>
    </div>
  )
}