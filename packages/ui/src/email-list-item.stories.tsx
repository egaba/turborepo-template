import type { Meta, StoryObj } from '@storybook/react'
import { EmailListItem } from './email-list-item'

const meta: Meta<typeof EmailListItem> = {
  title: 'Aviation/EmailListItem',
  component: EmailListItem,
  parameters: { layout: 'padded' },
  decorators: [(Story) => <div className="max-w-2xl">{Story()}</div>],
}

export default meta
type Story = StoryObj<typeof EmailListItem>

export const Default: Story = {
  args: {
    sender: 'John Carter',
    company: 'Atlas Aviation',
    subject: 'Quote for LFPG-KJFK round trip',
    preview: 'Hi team, please find attached the quote for the Paris to New York round trip...',
    timestamp: '2:30 PM',
  },
}

export const Unread: Story = {
  args: {
    sender: 'Sarah Mitchell',
    company: 'SkyBridge Partners',
    subject: 'New trip request - Dubai to Mumbai',
    preview: 'We have a new client requesting a heavy jet from OMDB to VABB on April 10th...',
    tripId: 'T-2026-0451',
    status: 'New Request',
    statusVariant: 'new-request',
    timestamp: '10:15 AM',
    unread: true,
    threadCount: 3,
  },
}

export const Starred: Story = {
  args: {
    sender: 'Michael Chen',
    company: 'PrimeJet',
    subject: 'RE: Booking confirmation for T-2026-0399',
    preview: 'Booking has been confirmed. Aircraft tail number VP-CAB will be assigned...',
    tripId: 'T-2026-0399',
    status: 'Booking Confirmed',
    statusVariant: 'booking-confirmed',
    timestamp: 'Yesterday',
    starred: true,
    onStar: () => {},
  },
}

export const WithAllFeatures: Story = {
  args: {
    sender: 'Emma Wilson',
    company: 'JetConnect',
    subject: 'Missing info for London trip',
    preview: 'We still need the passport details for 2 passengers on the EGLL-LEMD flight...',
    tripId: 'T-2026-0412',
    status: 'Trip Info Missing',
    statusVariant: 'trip-info-missing',
    timestamp: 'Mar 1',
    unread: true,
    starred: false,
    threadCount: 5,
    selected: false,
    onSelect: () => {},
    onStar: () => {},
  },
}

export const QuoteSent: Story = {
  args: {
    sender: 'David Park',
    company: 'AeroLink',
    subject: 'Quote sent for Nice-London',
    preview: 'The quote has been sent to the client for the LFMN-EGLF leg. Total: EUR 28,500...',
    tripId: 'T-2026-0430',
    status: 'Quote Sent',
    statusVariant: 'quote-sent',
    timestamp: 'Feb 28',
  },
}

export const EmailList: Story = {
  render: () => (
    <div className="divide-y divide-base-300 rounded-lg border border-base-300">
      <EmailListItem
        sender="Sarah Mitchell"
        company="SkyBridge"
        subject="New trip request - Dubai to Mumbai"
        preview="Heavy jet from OMDB to VABB on April 10th..."
        tripId="T-0451"
        status="New Request"
        statusVariant="new-request"
        timestamp="10:15 AM"
        unread
        onSelect={() => {}}
        onStar={() => {}}
      />
      <EmailListItem
        sender="Michael Chen"
        company="PrimeJet"
        subject="RE: Booking confirmation"
        preview="Booking confirmed. Aircraft VP-CAB assigned..."
        tripId="T-0399"
        status="Booking Confirmed"
        statusVariant="booking-confirmed"
        timestamp="Yesterday"
        starred
        onSelect={() => {}}
        onStar={() => {}}
      />
      <EmailListItem
        sender="Emma Wilson"
        company="JetConnect"
        subject="Missing passenger info"
        preview="Need passport details for 2 passengers..."
        tripId="T-0412"
        status="Trip Info Missing"
        statusVariant="trip-info-missing"
        timestamp="Feb 28"
        threadCount={3}
        onSelect={() => {}}
        onStar={() => {}}
      />
      <EmailListItem
        sender="David Park"
        company="AeroLink"
        subject="Quote sent for Nice-London"
        preview="Quote sent, total EUR 28,500..."
        tripId="T-0430"
        status="Quote Sent"
        statusVariant="quote-sent"
        timestamp="Feb 27"
        onSelect={() => {}}
        onStar={() => {}}
      />
    </div>
  ),
}
