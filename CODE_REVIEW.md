# Part 2 — Code Review

## Pull Request Review: UserList Component

**Review decision: Request Changes**

### Inline Review Comments

#### 1. Lines 8–12 — Missing useEffect Dependency Array

**Severity: Blocking**

The `useEffect` runs after every render because it has no dependency array. Since `setUsers` triggers another render after fetching data, this can create an infinite cycle of API requests and re-renders.

**Suggested fix:** Add `[apiUrl, query]` as dependencies. Additionally, debounce the search query before using it in the effect.

```jsx
useEffect(() => {
  // Fetch users when dependencies change
}, [apiUrl, debouncedQuery]);
```

#### 2. Lines 9–11 — Missing Error Handling and HTTP Status Validation

**Severity: Blocking**

The fetch operation does not verify `response.ok` or handle network failures. If the request fails, the component provides no useful error feedback and may attempt to process an invalid response.

**Suggested fix:** Use `async/await`, validate the HTTP response, and maintain loading and error states. Provide a Retry button so users can recover from failures.

```jsx
if (!response.ok) {
  throw new Error(`Failed to fetch users: ${response.status}`);
}
```

#### 3. Lines 9–12 — Race Conditions and Missing Request Cancellation

**Severity: Blocking**

When the search query changes, multiple requests can overlap. An older, slower response may overwrite the results of a newer query.

**Suggested fix:** Use `AbortController` inside the effect and abort the previous request in its cleanup function.

```jsx
useEffect(() => {
  const controller = new AbortController();

  // Pass controller.signal to fetch

  return () => controller.abort();
}, [apiUrl, debouncedQuery]);
```

#### 4. Lines 9 and 21 — Search Requests Are Not Debounced

**Severity: Blocking**

Every search input change can trigger a new API request once the effect dependencies are corrected. This causes unnecessary network traffic and does not meet the 300ms debounce requirement.

**Suggested fix:** Introduce a custom `useDebounce` hook and use its delayed value for filtering or API requests.

Also encode the query when constructing a URL:

```jsx
const url = `${apiUrl}/users?search=${encodeURIComponent(debouncedQuery)}`;
```

Verify that the backend actually supports the `search` parameter. Otherwise, fetch users once and filter the results locally.

#### 5. Lines 14–16 — Direct React State Mutation

**Severity: Blocking**

The `selected` object is mutated directly, and the same reference is passed back into `setSelected`. React may skip re-rendering because the object reference has not changed.

**Suggested fix:** Use a functional state update and create a new object.

```jsx
function toggle(user) {
  setSelected((prev) => ({
    ...prev,
    [user.id]: !prev[user.id],
  }));
}
```

#### 6. Line 24 — Using Array Index as React Key

**Severity: Non-blocking**

Using the array index as a key can cause incorrect component reconciliation when users are filtered, sorted, or reordered.

**Suggested fix:** Use a stable, unique identifier.

```jsx
key={user.id}
```

#### 7. Lines 23–27 — Missing Keyboard Accessibility

**Severity: Blocking**

The clickable `div` only supports mouse interaction. Keyboard users cannot reliably focus on it or select users with Enter or Space.

**Suggested fix:** Use a semantic checkbox with an associated label, allowing users to select and deselect items using the keyboard.

```jsx
<label>
  <input
    type="checkbox"
    checked={Boolean(selected[user.id])}
    onChange={() => toggle(user)}
  />
  {user.name}
</label>
```

#### 8. Line 26 — Selection State Relies Only on Color

**Severity: Blocking**

Using red and black text as the only indication of selection makes the interface inaccessible to users with color-vision deficiencies.

**Suggested fix:** Display a checkbox and/or a visible "Selected" label alongside the color change.

#### 9. Line 28 — Missing Image Alternative Text

**Severity: Non-blocking**

The image does not include an `alt` attribute, making its purpose unclear to assistive technologies.

**Suggested fix:** Provide meaningful alternative text if the avatar conveys information, or use an empty `alt` attribute if it is purely decorative.

```jsx
<img src={user.avatar} alt="" />
```

#### 10. Line 29 — Potential Cross-Site Scripting (XSS)

**Severity: Blocking**

Rendering `user.bio` using `dangerouslySetInnerHTML` without ensuring that the content is safe creates a potential XSS vulnerability if the API returns untrusted HTML.

**Suggested fix:** Render the biography as plain text whenever HTML formatting is unnecessary.

```jsx
<span>{user.bio}</span>
```

If HTML rendering is required, sanitize the content using a trusted HTML sanitization library before rendering it.

#### 11. Lines 4–6 — Missing TypeScript Types

**Severity: Non-blocking**

The component does not define explicit types for its API response, props, or selected-user state. Adding types would improve maintainability and catch incorrect data usage earlier.

**Suggested fix:** Define a `User` interface and type the component props and state, for example `useState<User[]>([])`.

#### 12. Lines 4–12 and 19–36 — Missing UI States and Persistence

**Severity: Blocking**

The implementation does not provide distinct loading, error, and empty states. Additionally, the selected users are stored only in React state, meaning selections are lost after a page refresh. These omissions fail important functional requirements.

**Suggested fix:** Implement explicit loading/error/empty UI states, provide a Retry action, and persist selected IDs using `localStorage`. Also add the missing "Clear selection" button.



