# Aix Finance Club - CMS Guide

## Overview

The Aix Finance Club website includes a complete Content Management System (CMS) built into the admin panel, allowing you to manage:
- **Pages** - Static page content via JSON
- **Team Members** - Club leadership and team profiles
- **Events** - Club events and activities
- **Publications** - Articles and carousels

## Admin Dashboard

Access the admin dashboard at `/admin`:
1. Go to `/admin/login`
2. Enter your admin password (set via `ADMIN_PASSWORD` environment variable)
3. You'll be locked out for 15 minutes after 5 failed attempts (rate limiting)

The dashboard has 4 main sections:

### 1. Pages Manager

Manage static content for 7 pages:
- **home** - Homepage content
- **about** - About page content
- **mission** - Mission statement page
- **resources** - Resources page content
- **contact** - Contact page content
- **footer** - Footer content
- **navigation** - Navigation menu content

**How to edit:**
1. Click a page from the list
2. Edit the JSON content in the editor
3. Click "Preview" to validate JSON syntax
4. Click "Save" to update (saved to Supabase `page_content` table)

**Content Structure Example:**
```json
{
  "hero": {
    "title": "Bienvenue",
    "subtitle": "À Aix Finance Club",
    "cta_text": "Découvrir",
    "cta_link": "/about"
  },
  "sections": [
    {
      "title": "Section Title",
      "content": "Section content here",
      "image_url": "https://..."
    }
  ]
}
```

**Using Page Content in Your App:**

```tsx
'use client'
import { usePageContent } from '@/lib/hooks/usePageContent'

export default function HomePage() {
  const { content, loading, error } = usePageContent('home')
  
  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>
  
  return (
    <div>
      <h1>{content?.hero?.title}</h1>
      {/* Use content to render page */}
    </div>
  )
}
```

### 2. Team Members Manager

Manage club team member profiles.

**Fields:**
- **Nom** - Member name
- **Rôle** - Position (President, VP, etc.)
- **Bio** - Member biography (HTML sanitized)
- **URL LinkedIn** - LinkedIn profile link
- **Photo** - Profile photo (uploaded to Supabase storage)
- **Ordre d'affichage** - Display order (0 = first)

**How to add a member:**
1. Click "Ajouter un membre"
2. Fill in the form
3. Click the photo upload area to add a profile picture
4. Click "Créer le membre"

**How to edit a member:**
1. Click "Modifier" on a member card
2. Update the fields
3. Click "Mettre à jour"

**How to delete a member:**
1. Click "Supprimer" on a member card
2. Confirm deletion

**Using Team Members in Your App:**

```tsx
'use client'
import { useTeamMembers } from '@/lib/hooks/useTeamMembers'

export default function TeamPage() {
  const { members, loading, error } = useTeamMembers()
  
  if (loading) return <div>Loading...</div>
  
  return (
    <div className="grid grid-cols-3 gap-4">
      {members.map(member => (
        <div key={member.id}>
          {member.photo_url && <img src={member.photo_url} alt={member.name} />}
          <h3>{member.name}</h3>
          <p>{member.role}</p>
          {member.bio && <p>{member.bio}</p>}
          {member.linkedin_url && (
            <a href={member.linkedin_url} target="_blank">LinkedIn</a>
          )}
        </div>
      ))}
    </div>
  )
}
```

### 3. Events Manager

Manage club events (same as before).

**Fields:**
- **Title** - Event name
- **Description** - Event details
- **Date** - Event date
- **Time** - Event time
- **Location** - Event location
- **Category** - Event category for filtering
- **Status** - upcoming or past
- **Image** - Event cover image
- **Ticket URL** - Link to book tickets

### 4. Publications Manager

Manage articles and carousels (same as before).

**Fields:**
- **Type** - Article or Carousel
- **Title** - Publication title
- **Author** - Publication author
- **Read Time** - Estimated reading time
- **Content** - Article HTML content (TipTap editor, sanitized)
- **Category** - Publication category
- **Tags** - Comma-separated tags
- **Cover Image** - Publication cover

---

## Database Schema

### page_content
```sql
- id: UUID (primary key)
- page_name: Text (home, about, mission, resources, contact, footer, navigation)
- content: JSONB (flexible JSON structure for page content)
- updated_at: Timestamp
- created_at: Timestamp
```

### team_members
```sql
- id: UUID (primary key)
- name: Text (required)
- role: Text (required)
- bio: Text (optional, HTML sanitized)
- photo_url: Text (optional, Supabase storage URL)
- linkedin_url: Text (optional)
- display_order: Integer (for ordering)
- created_at: Timestamp
- updated_at: Timestamp
```

---

## Security Features

All admin changes are protected by:
1. **Admin authentication** - Password-based with rate limiting
2. **HTML sanitization** - XSS prevention on text content
3. **Server-side actions** - All database changes via secure server actions
4. **Row Level Security (RLS)** - Public read access, authenticated write access
5. **Supabase Service Role** - Only used on server, never exposed to client

---

## Best Practices

### When Creating Page Content

1. Keep JSON structure simple and consistent
2. Use clear key names that match your component structure
3. Include versioning for major changes:
   ```json
   {
     "version": "1.0",
     "lastUpdated": "2024-03-15",
     "content": { ... }
   }
   ```

### When Managing Team Members

1. Always upload photos in JPEG or PNG format (max 5MB)
2. Keep bios concise (100-200 characters recommended)
3. Include LinkedIn URLs for professional credibility
4. Order members by hierarchy or importance

### When Editing HTML Content

1. Use the TipTap editor for rich text
2. Avoid inline styles - use semantic HTML
3. Always test content in preview mode
4. Check link URLs work correctly

---

## Troubleshooting

### Pages Won't Load
- Check JSON syntax in the editor (use Preview button)
- Verify page_name matches exactly (case-sensitive)
- Check browser console for error messages

### Team Photos Don't Upload
- File must be JPEG, PNG, WebP, or GIF
- Maximum file size is 5MB
- Check Supabase storage bucket permissions

### Changes Don't Appear
- Clear browser cache (Ctrl+F5)
- Check if you're viewing the right page
- Verify page_content table has a row for that page

### Admin Login Blocked
- You're temporarily locked out after 5 failed attempts
- Wait 15 minutes for the lock to expire
- Check ADMIN_PASSWORD environment variable

---

## API Reference

### Server Actions (in `/app/admin/actions.ts`)

#### Page Content
- `getPageContent(pageName)` - Fetch single page content
- `updatePageContent(id, content)` - Update page content

#### Team Members
- `getTeamMembers()` - Fetch all team members
- `createTeamMember(formData)` - Create new member
- `updateTeamMember(id, formData)` - Update member
- `deleteTeamMember(id)` - Delete member

#### Events & Publications
- `createEvent(formData)` - Create event
- `updateEvent(id, formData)` - Update event
- `deleteEvent(id)` - Delete event
- `createPublication(formData)` - Create publication
- `updatePublication(id, formData)` - Update publication
- `deletePublication(id)` - Delete publication

### Hooks (in `/lib/hooks/`)

- `usePageContent(pageName)` - Fetch page content hook
- `useTeamMembers()` - Fetch team members hook

---

## Future Enhancements

Potential features to add:
- Preview mode for pages before publishing
- Bulk import/export of content
- Content versioning and rollback
- SEO metadata management
- Image gallery management
- Blog post scheduling
- Multi-language support
