'use client'

import { useState } from 'react'

import { Badge } from '@repo/ui/badge'
import { Button } from '@repo/ui/button'
import { EmailListItem } from '@repo/ui/email-list-item'
import { PageHeader } from '@repo/ui/page-header'
import { Tabs } from '@repo/ui/tabs'

import { MOCK_EMAILS } from './_data/mock-emails'

function SearchIcon() {
  return (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
      />
    </svg>
  )
}

function FilterIcon() {
  return (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
      />
    </svg>
  )
}

function PlusIcon() {
  return (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
    </svg>
  )
}

function EmailList({
  emails,
}: Readonly<{
  emails: typeof MOCK_EMAILS
}>) {
  const [starredIds, setStarredIds] = useState<Set<string>>(
    new Set(MOCK_EMAILS.filter((e) => e.starred).map((e) => e.id)),
  )
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set())

  function toggleStar(id: string) {
    setStarredIds((prev) => {
      const next = new Set(prev)
      if (next.has(id)) {
        next.delete(id)
      } else {
        next.add(id)
      }
      return next
    })
  }

  function toggleSelect(id: string) {
    setSelectedIds((prev) => {
      const next = new Set(prev)
      if (next.has(id)) {
        next.delete(id)
      } else {
        next.add(id)
      }
      return next
    })
  }

  return (
    <div className="border-base-300 bg-base-100 rounded-lg border">
      {emails.map((email) => (
        <EmailListItem
          key={email.id}
          sender={email.sender}
          company={email.company}
          subject={email.subject}
          preview={email.preview}
          {...(email.tripId != null ? { tripId: email.tripId } : {})}
          {...(email.status != null ? { status: email.status } : {})}
          {...(email.statusVariant != null ? { statusVariant: email.statusVariant } : {})}
          timestamp={email.timestamp}
          unread={email.unread}
          starred={starredIds.has(email.id)}
          {...(email.threadCount != null ? { threadCount: email.threadCount } : {})}
          selected={selectedIds.has(email.id)}
          onSelect={() => toggleSelect(email.id)}
          onStar={() => toggleStar(email.id)}
        />
      ))}
    </div>
  )
}

const newRequestEmails = MOCK_EMAILS.filter((e) => e.statusVariant === 'new-request')
const notificationEmails = MOCK_EMAILS.filter((e) => !e.tripId)

export default function InboxPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="AI Inbox"
        badge={
          <Badge variant="accent" size="sm">
            {MOCK_EMAILS.filter((e) => e.unread).length} unread
          </Badge>
        }
        actions={
          <>
            <Button variant="ghost" size="sm">
              <SearchIcon />
              Search
            </Button>
            <Button variant="ghost" size="sm">
              <FilterIcon />
              Filter
            </Button>
            <Button variant="primary" size="sm">
              <PlusIcon />
              Compose
            </Button>
          </>
        }
        tabs={
          <Tabs
            variant="underline"
            tabs={[
              {
                label: 'All',
                count: MOCK_EMAILS.length,
                content: <EmailList emails={MOCK_EMAILS} />,
              },
              {
                label: 'New requests',
                count: newRequestEmails.length,
                content: <EmailList emails={newRequestEmails} />,
              },
              {
                label: 'Notifications',
                count: notificationEmails.length,
                content: <EmailList emails={notificationEmails} />,
              },
            ]}
          />
        }
      />
    </div>
  )
}
