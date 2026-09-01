import React from 'react'

const container: React.CSSProperties = {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '0.5rem',
    marginBottom: '1rem',
    justifyContent: 'center',
}

const tagButton: React.CSSProperties = {
    padding: '0.5rem 1rem',
    borderRadius: '4px',
    border: '1px solid var(--border)',
    background: 'var(--search-input)',
    color: 'var(--muted-foreground)',
    cursor: 'pointer',
    textDecoration: 'none',
    fontSize: '1rem',
    fontFamily: '"Source Code Pro", monospace',
}

const activeTag: React.CSSProperties = {
    ...tagButton,
    background: 'var(--primary)',
    color: 'var(--background)',
    fontWeight: 'bold',
}

const rcTag: React.CSSProperties = {
    ...tagButton,
    borderColor: '#007EC6',
}

const betaTag: React.CSSProperties = {
    ...tagButton,
    borderColor: '#FE7D37',
}

interface DistTagsProps {
    packageName: string
    currentVersion: string
    tags: { [tag: string]: string }
}

export default function DistTags({ packageName, currentVersion, tags }: DistTagsProps) {
    const priorityTags = ['latest', 'rc', 'beta', 'next', 'canary']
    const displayTags = priorityTags.filter(tag => tags[tag])

    if (displayTags.length <= 1) {
        return null
    }

    return (
        <div style={container}>
            {displayTags.map(tag => {
                const version = tags[tag]
                const isCurrent = version === currentVersion
                let style = isCurrent ? activeTag : tagButton
                if (!isCurrent) {
                    if (tag === 'rc') style = rcTag
                    else if (tag === 'beta') style = betaTag
                }
                return (
                    <a
                        key={tag}
                        href={`/result?p=${packageName}@${version}`}
                        style={style}
                        title={`${tag}: ${version}`}
                    >
                        {tag} ({version})
                    </a>
                )
            })}
        </div>
    )
}
