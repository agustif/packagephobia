import React, { useState } from 'react'

const container: React.CSSProperties = {
    margin: '2rem 0',
    padding: '1.5rem',
    border: '1px solid var(--border)',
    borderRadius: '8px',
    background: 'var(--card)',
}

const title: React.CSSProperties = {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    marginBottom: '1rem',
    color: 'var(--foreground)',
}

const description: React.CSSProperties = {
    fontSize: '1rem',
    marginBottom: '1rem',
    color: 'var(--muted-foreground)',
}

const exportsGrid: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
    gap: '0.5rem',
    maxHeight: '300px',
    overflowY: 'auto',
    marginBottom: '1rem',
    padding: '0.5rem',
    border: '1px solid var(--border)',
    borderRadius: '4px',
}

const exportItem: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    padding: '0.25rem',
    fontSize: '0.9rem',
    fontFamily: '"Source Code Pro", monospace',
}

const checkbox: React.CSSProperties = {
    marginRight: '0.5rem',
    cursor: 'pointer',
}

const controls: React.CSSProperties = {
    display: 'flex',
    gap: '1rem',
    marginBottom: '1rem',
    flexWrap: 'wrap',
}

const button: React.CSSProperties = {
    padding: '0.5rem 1rem',
    borderRadius: '4px',
    border: '1px solid var(--border)',
    background: 'var(--search-input)',
    color: 'var(--foreground)',
    cursor: 'pointer',
    fontSize: '1rem',
}

const sizeDisplay: React.CSSProperties = {
    padding: '1rem',
    borderRadius: '4px',
    background: 'var(--muted)',
    fontSize: '1.2rem',
    fontWeight: 'bold',
    textAlign: 'center',
}

interface SubpackagePickerProps {
    packageName: string
    version: string
    exports: string[]
    totalInstallSize: number
    totalPublishSize: number
}

export default function SubpackagePicker({
    exports,
    totalInstallSize,
    totalPublishSize,
}: SubpackagePickerProps) {
    const [selectedExports, setSelectedExports] = useState<Set<string>>(new Set())
    const [minimalSize, setMinimalSize] = useState<{ install: number; publish: number } | null>(null)
    const [isLoading, setIsLoading] = useState(false)

    if (!exports || exports.length === 0) {
        return null
    }

    const toggleExport = (exportPath: string) => {
        const newSelected = new Set(selectedExports)
        if (newSelected.has(exportPath)) {
            newSelected.delete(exportPath)
        } else {
            newSelected.add(exportPath)
        }
        setSelectedExports(newSelected)
        setMinimalSize(null)
    }

    const selectAll = () => {
        setSelectedExports(new Set(exports))
        setMinimalSize(null)
    }

    const selectNone = () => {
        setSelectedExports(new Set())
        setMinimalSize(null)
    }

    const calculateMinimalSize = async () => {
        if (selectedExports.size === 0) {
            alert('Please select at least one export')
            return
        }

        setIsLoading(true)
        try {
            const exportsList = Array.from(selectedExports)
            const ratio = exportsList.length / exports.length
            const estimatedInstall = Math.round(totalInstallSize * ratio)
            const estimatedPublish = Math.round(totalPublishSize * ratio)

            setMinimalSize({
                install: estimatedInstall,
                publish: estimatedPublish,
            })
        } catch (err) {
            console.error('Failed to calculate minimal size:', err)
            alert('Failed to calculate size')
        } finally {
            setIsLoading(false)
        }
    }

    const formatBytes = (bytes: number): string => {
        const units = ['B', 'kB', 'MB', 'GB']
        const KB = 1024
        const exponent = Math.min(Math.floor(Math.log10(bytes) / 3), units.length - 1)
        const size = (bytes / Math.pow(KB, exponent)).toPrecision(3)
        return `${size} ${units[exponent]}`
    }

    return (
        <div style={container}>
            <div style={title}>Select Subpackages</div>
            <div style={description}>
                This package has {exports.length} subpackage exports. Select only the ones you need to estimate a
                smaller bundle size.
            </div>

            <div style={controls}>
                <button style={button} onClick={selectAll}>
                    Select All
                </button>
                <button style={button} onClick={selectNone}>
                    Select None
                </button>
                <button style={button} onClick={calculateMinimalSize} disabled={isLoading}>
                    {isLoading ? 'Calculating...' : 'Calculate Minimal Size'}
                </button>
                <span style={{ alignSelf: 'center', color: 'var(--muted-foreground)' }}>
                    {selectedExports.size} / {exports.length} selected
                </span>
            </div>

            <div style={exportsGrid}>
                {exports.map(exp => (
                    <label key={exp} style={exportItem}>
                        <input
                            type="checkbox"
                            checked={selectedExports.has(exp)}
                            onChange={() => toggleExport(exp)}
                            style={checkbox}
                        />
                        {exp}
                    </label>
                ))}
            </div>

            {minimalSize && (
                <div style={sizeDisplay}>
                    <div>Estimated Minimal Size:</div>
                    <div>Install: {formatBytes(minimalSize.install)}</div>
                    <div>Publish: {formatBytes(minimalSize.publish)}</div>
                    <div style={{ fontSize: '0.9rem', marginTop: '0.5rem', fontWeight: 'normal' }}>
                        (Estimated based on {selectedExports.size}/{exports.length} exports selected)
                    </div>
                </div>
            )}
        </div>
    )
}
