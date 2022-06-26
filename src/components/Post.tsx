import { format, formatDistanceToNow } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'
import { ChangeEvent, FormEvent, useState } from 'react'

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
  const [comments, setComments] = useState([
    {
      id: '1',
      author: {
        avatarUrl: 'https://github.com/thihxm.png',
        name: 'Thiago Medeiros',
      },
      publishedAt: new Date('2022-06-26T10:32:00'),
      content: 'Muito bom, parabéns!! 👏👏',
    }
  ])

  const [newCommentText, setNewCommentText] = useState('')
  
  const publishedAtFormatted = format(publishedAt, "d 'de' LLLL 'às' HH:mm'h'", { locale: ptBR })

  const publishedAtRealtiveToNow = formatDistanceToNow(publishedAt, { locale: ptBR, addSuffix: true })

  const handleCreateNewComment = (event: FormEvent) => {
    event.preventDefault()

    const commentDate = new Date()

    const newComment = {
      id: `${comments.length + 1}_${commentDate.getTime()}`,
      author: {
        avatarUrl: 'https://github.com/thihxm.png',
        name: 'Thiago Medeiros',
      },
      publishedAt: commentDate,
      content: newCommentText,
    }

    setComments([...comments, newComment])

    setNewCommentText('')
  }

  const handleNewCommentChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setNewCommentText(event.target.value)
  }

  const deleteComment = (id: string) => {
    setComments(comments.filter(comment => comment.id !== id))
  }

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
            return <p key={content}>{content}</p>
          }

          if (type === 'link') {
            return <p key={content}><a href='#'>{content}</a></p>
          }
        })}
        
        {tags && (
          <p>
            {
              tags.map(tag => (
                <a key={tag} href={`${tag}`}>{tag}</a>
              ))
            }
          </p>
        )}
      </div>

      <form onSubmit={handleCreateNewComment} className={styles.commentForm}>
        <strong>Deixe seu feedback</strong>

        <textarea
          value={newCommentText}
          placeholder='Escreva um comentário...'
          onChange={handleNewCommentChange}
        />
  
        <footer>
          <button type="submit">Publicar</button>
        </footer>
      </form>

      <div className={styles.commentList}>
        {comments.map(comment => (
          <Comment
            key={comment.id}
            id={comment.id}
            author={comment.author}
            publishedAt={comment.publishedAt}
            content={comment.content}
            onDeleteComment={deleteComment}
          />
        ))}
      </div>
    </article>
  )
}