import { format, formatDistanceToNow } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'
import { ThumbsUp, Trash } from 'phosphor-react'
import { useState } from 'react'

import { Avatar } from './Avatar'
import styles from './Comment.module.css'

interface CommentProps {
  id: string
  author: {
    avatarUrl: string
    name: string
  }
  publishedAt: Date
  content: string
  onDeleteComment: (id: string) => void
}

export function Comment({
  id,
  author,
  publishedAt,
  content,
  onDeleteComment,
}: CommentProps) {
  const [likeCount, setLikeCount] = useState(0)

  const publishedAtFormatted = format(publishedAt, "d 'de' LLLL 'às' HH:mm'h'", { locale: ptBR })
  
  const publishedAtRealtiveToNow = formatDistanceToNow(publishedAt, { locale: ptBR, addSuffix: true })

  const handleDeleteComment = () => {
    onDeleteComment(id)
  }

  const handleLikeComment = () => {
    setLikeCount((currLikeCount) => currLikeCount + 1)
  }
  
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

            <button onClick={handleDeleteComment} title='Deletar comentário'>
              <Trash size={24} />
            </button>
          </header>

          <p>{content}</p>
        </div>

        <footer>
          <button onClick={handleLikeComment}>
            <ThumbsUp size={20} />
            Aplaudir <span>{likeCount}</span>
          </button>
        </footer>
      </div>
    </div>
  )
}