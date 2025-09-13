import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { toHaveNoViolations } from 'jest-axe';
import axe from 'axe-core';
import { Avatar, AvatarImage, AvatarFallback } from '../avatar';

expect.extend(toHaveNoViolations);

const runAxe = async (container: HTMLElement) => {
  const results = await axe.run(container);
  return results;
};

describe('Avatar Accessibility', () => {
  it('should not have accessibility violations with basic avatar', async () => {
    const { container } = render(<Avatar>JD</Avatar>);

    const results = await runAxe(container);
    expect(results).toHaveNoViolations();
  });

  it('should not have accessibility violations with different sizes', async () => {
    const sizes = ['sm', 'md', 'lg', 'xl'] as const;

    for (const size of sizes) {
      const { container } = render(
        <Avatar size={size}>
          {size.toUpperCase()}
        </Avatar>
      );

      const results = await runAxe(container);
      expect(results).toHaveNoViolations();
    }
  });

  it('should not have accessibility violations with image avatar', async () => {
    const { container } = render(
      <Avatar src="https://example.com/avatar.jpg" alt="User avatar">
        <AvatarFallback>JD</AvatarFallback>
      </Avatar>
    );

    const results = await runAxe(container);
    expect(results).toHaveNoViolations();
  });

  it('should not have accessibility violations with avatar image component', async () => {
    const { container } = render(
      <AvatarImage src="https://example.com/avatar.jpg" alt="User avatar" />
    );

    const results = await runAxe(container);
    expect(results).toHaveNoViolations();
  });

  it('should not have accessibility violations with avatar fallback component', async () => {
    const { container } = render(
      <AvatarFallback>JD</AvatarFallback>
    );

    const results = await runAxe(container);
    expect(results).toHaveNoViolations();
  });

  it('should not have accessibility violations with complete avatar structure', async () => {
    const { container } = render(
      <Avatar size="lg" src="https://example.com/avatar.jpg" alt="User avatar">
        <AvatarImage src="https://example.com/avatar.jpg" alt="User avatar" />
        <AvatarFallback>JD</AvatarFallback>
      </Avatar>
    );

    const results = await runAxe(container);
    expect(results).toHaveNoViolations();
  });

  it('should not have accessibility violations with multiple avatars', async () => {
    const { container } = render(
      <div>
        <Avatar size="sm" alt="User A">A</Avatar>
        <Avatar size="md" alt="User B">B</Avatar>
        <Avatar size="lg" alt="User C">C</Avatar>
        <Avatar size="xl" alt="User D">D</Avatar>
      </div>
    );

    const results = await runAxe(container);
    expect(results).toHaveNoViolations();
  });

  it('should not have accessibility violations with avatars in a list', async () => {
    const { container } = render(
      <ul>
        <li>
          <Avatar>JD</Avatar>
          <span>John Doe</span>
        </li>
        <li>
          <Avatar>JS</Avatar>
          <span>Jane Smith</span>
        </li>
        <li>
          <Avatar>BJ</Avatar>
          <span>Bob Johnson</span>
        </li>
      </ul>
    );

    const results = await runAxe(container);
    expect(results).toHaveNoViolations();
  });

  it('should not have accessibility violations with avatars in a table', async () => {
    const { container } = render(
      <table>
        <thead>
          <tr>
            <th>User</th>
            <th>Name</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><Avatar>JD</Avatar></td>
            <td>John Doe</td>
            <td>Active</td>
          </tr>
          <tr>
            <td><Avatar>JS</Avatar></td>
            <td>Jane Smith</td>
            <td>Inactive</td>
          </tr>
        </tbody>
      </table>
    );

    const results = await runAxe(container);
    expect(results).toHaveNoViolations();
  });

  it('should not have accessibility violations with avatars in a card', async () => {
    const { container } = render(
      <div className="card">
        <div className="card-header">
          <Avatar>JD</Avatar>
          <div>
            <h3>John Doe</h3>
            <p>Software Developer</p>
          </div>
        </div>
        <div className="card-content">
          <p>User profile information</p>
        </div>
      </div>
    );

    const results = await runAxe(container);
    expect(results).toHaveNoViolations();
  });

  it('should not have accessibility violations with avatars containing emojis', async () => {
    const { container } = render(
      <div>
        <Avatar>😀</Avatar>
        <Avatar>🚀</Avatar>
        <Avatar>⭐</Avatar>
        <Avatar>🔥</Avatar>
      </div>
    );

    const results = await runAxe(container);
    expect(results).toHaveNoViolations();
  });

  it('should not have accessibility violations with avatars containing special characters', async () => {
    const { container } = render(
      <div>
        <Avatar>@</Avatar>
        <Avatar>#</Avatar>
        <Avatar>$</Avatar>
        <Avatar>%</Avatar>
      </div>
    );

    const results = await runAxe(container);
    expect(results).toHaveNoViolations();
  });

  it('should not have accessibility violations with avatars containing numbers', async () => {
    const { container } = render(
      <div>
        <Avatar>1</Avatar>
        <Avatar>42</Avatar>
        <Avatar>999</Avatar>
        <Avatar>1K</Avatar>
      </div>
    );

    const results = await runAxe(container);
    expect(results).toHaveNoViolations();
  });

  it('should not have accessibility violations with avatars containing long text', async () => {
    const { container } = render(
      <Avatar>Very Long Name</Avatar>
    );

    const results = await runAxe(container);
    expect(results).toHaveNoViolations();
  });

  it('should not have accessibility violations with avatars containing mixed content', async () => {
    const { container } = render(
      <Avatar>
        <span>J</span>
        <span>D</span>
      </Avatar>
    );

    const results = await runAxe(container);
    expect(results).toHaveNoViolations();
  });

  it('should not have accessibility violations with avatars containing unicode characters', async () => {
    const { container } = render(
      <div>
        <Avatar>α</Avatar>
        <Avatar>β</Avatar>
        <Avatar>γ</Avatar>
        <Avatar>δ</Avatar>
      </div>
    );

    const results = await runAxe(container);
    expect(results).toHaveNoViolations();
  });

  it('should not have accessibility violations with avatars containing mixed languages', async () => {
    const { container } = render(
      <div>
        <Avatar>English</Avatar>
        <Avatar>中文</Avatar>
        <Avatar>日本語</Avatar>
        <Avatar>한국어</Avatar>
      </div>
    );

    const results = await runAxe(container);
    expect(results).toHaveNoViolations();
  });

  it('should not have accessibility violations with avatars in a form', async () => {
    const { container } = render(
      <form>
        <div>
          <label htmlFor="username">Username</label>
          <input id="username" type="text" />
          <Avatar>JD</Avatar>
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input id="email" type="email" />
          <Avatar>JS</Avatar>
        </div>
        <button type="submit">Submit</button>
      </form>
    );

    const results = await runAxe(container);
    expect(results).toHaveNoViolations();
  });

  it('should not have accessibility violations with avatars in a navigation', async () => {
    const { container } = render(
      <nav>
        <ul>
          <li>
            <a href="#profile">
              <Avatar>JD</Avatar>
              <span>Profile</span>
            </a>
          </li>
          <li>
            <a href="#settings">
              <Avatar>JS</Avatar>
              <span>Settings</span>
            </a>
          </li>
        </ul>
      </nav>
    );

    const results = await runAxe(container);
    expect(results).toHaveNoViolations();
  });

  it('should not have accessibility violations with avatars in a dropdown', async () => {
    const { container } = render(
      <div>
        <button>
          <Avatar>JD</Avatar>
          <span>John Doe</span>
        </button>
        <div>
          <a href="#profile">Profile</a>
          <a href="#settings">Settings</a>
          <a href="#logout">Logout</a>
        </div>
      </div>
    );

    const results = await runAxe(container);
    expect(results).toHaveNoViolations();
  });

  it('should not have accessibility violations with avatars in a sidebar', async () => {
    const { container } = render(
      <aside>
        <div>
          <Avatar>JD</Avatar>
          <div>
            <h3>John Doe</h3>
            <p>Software Developer</p>
          </div>
        </div>
        <nav>
          <ul>
            <li><a href="#dashboard">Dashboard</a></li>
            <li><a href="#projects">Projects</a></li>
            <li><a href="#team">Team</a></li>
          </ul>
        </nav>
      </aside>
    );

    const results = await runAxe(container);
    expect(results).toHaveNoViolations();
  });

  it('should not have accessibility violations with avatars in a chat interface', async () => {
    const { container } = render(
      <div>
        <div>
          <Avatar>JD</Avatar>
          <div>
            <span>John Doe</span>
            <p>Hello, how are you?</p>
          </div>
        </div>
        <div>
          <Avatar>JS</Avatar>
          <div>
            <span>Jane Smith</span>
            <p>I'm doing well, thank you!</p>
          </div>
        </div>
      </div>
    );

    const results = await runAxe(container);
    expect(results).toHaveNoViolations();
  });

  it('should not have accessibility violations with avatars in a user list', async () => {
    const { container } = render(
      <div>
        <h2>Team Members</h2>
        <div>
          <Avatar>JD</Avatar>
          <div>
            <h3>John Doe</h3>
            <p>Software Developer</p>
            <p>john.doe@example.com</p>
          </div>
        </div>
        <div>
          <Avatar>JS</Avatar>
          <div>
            <h3>Jane Smith</h3>
            <p>Designer</p>
            <p>jane.smith@example.com</p>
          </div>
        </div>
        <div>
          <Avatar>BJ</Avatar>
          <div>
            <h3>Bob Johnson</h3>
            <p>Product Manager</p>
            <p>bob.johnson@example.com</p>
          </div>
        </div>
      </div>
    );

    const results = await runAxe(container);
    expect(results).toHaveNoViolations();
  });

  it('should not have accessibility violations with avatars in a comment system', async () => {
    const { container } = render(
      <div>
        <div>
          <Avatar>JD</Avatar>
          <div>
            <span>John Doe</span>
            <time>2 hours ago</time>
            <p>Great article! Thanks for sharing.</p>
          </div>
        </div>
        <div>
          <Avatar>JS</Avatar>
          <div>
            <span>Jane Smith</span>
            <time>1 hour ago</time>
            <p>I agree, very informative.</p>
          </div>
        </div>
      </div>
    );

    const results = await runAxe(container);
    expect(results).toHaveNoViolations();
  });

  it('should not have accessibility violations with avatars in a notification system', async () => {
    const { container } = render(
      <div>
        <div>
          <Avatar>JD</Avatar>
          <div>
            <span>John Doe</span>
            <p>commented on your post</p>
            <time>5 minutes ago</time>
          </div>
        </div>
        <div>
          <Avatar>JS</Avatar>
          <div>
            <span>Jane Smith</span>
            <p>liked your photo</p>
            <time>10 minutes ago</time>
          </div>
        </div>
      </div>
    );

    const results = await runAxe(container);
    expect(results).toHaveNoViolations();
  });
});
