import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/vue';
import { toHaveNoViolations } from 'jest-axe';
import axe from 'axe-core';
import { NAvatar, NAvatarImage, NAvatarFallback } from '../avatar';

expect.extend(toHaveNoViolations);

const runAxe = (container: HTMLElement) => {
  return new Promise((resolve, reject) => {
    axe.run(container, (err, results) => {
      if (err) reject(err);
      else resolve(results);
    });
  });
};

describe('Vue Avatar Accessibility', () => {
  it('should not have accessibility violations with basic avatar', async () => {
    const { container } = render(NAvatar, {
      slots: { default: 'JD' },
    });

    const results = await runAxe(container);
    expect(results).toHaveNoViolations();
  });

  it('should not have accessibility violations with different sizes', async () => {
    const sizes = ['sm', 'md', 'lg', 'xl'] as const;

    for (const size of sizes) {
      const { container } = render(NAvatar, {
        props: { size },
        slots: { default: size.toUpperCase() },
      });

      const results = await runAxe(container);
      expect(results).toHaveNoViolations();
      
      
    }
  });

  it('should not have accessibility violations with image avatar', async () => {
    const { container } = render(NAvatar, {
      props: { src: 'https://example.com/avatar.jpg', alt: 'User avatar' },
      slots: { default: 'JD' },
    });

    const results = await runAxe(container);
    expect(results).toHaveNoViolations();
  });

  it('should not have accessibility violations with avatar image component', async () => {
    const { container } = render(NAvatarImage, {
      props: { src: 'https://example.com/avatar.jpg', alt: 'User avatar' },
    });

    const results = await runAxe(container);
    expect(results).toHaveNoViolations();
  });

  it('should not have accessibility violations with avatar fallback component', async () => {
    const { container } = render(NAvatarFallback, {
      slots: { default: 'JD' },
    });

    const results = await runAxe(container);
    expect(results).toHaveNoViolations();
  });

  it('should not have accessibility violations with complete avatar structure', async () => {
    const { container } = render(NAvatar, {
      props: { size: 'lg', src: 'https://example.com/avatar.jpg', alt: 'User avatar' },
      slots: { default: 'JD' },
    });

    const results = await runAxe(container);
    expect(results).toHaveNoViolations();
  });

  it('should not have accessibility violations with multiple avatars', async () => {
    const { container } = render({
      template: `
        <div>
          <NAvatar size="sm">A</NAvatar>
          <NAvatar size="md">B</NAvatar>
          <NAvatar size="lg">C</NAvatar>
          <NAvatar size="xl">D</NAvatar>
        </div>
      `,
      components: {
        NAvatar,
      },
    });

    const results = await runAxe(container);
    expect(results).toHaveNoViolations();
  });

  it('should not have accessibility violations with avatars in a list', async () => {
    const { container } = render({
      template: `
        <ul>
          <li>
            <NAvatar>JD</NAvatar>
            <span>John Doe</span>
          </li>
          <li>
            <NAvatar>JS</NAvatar>
            <span>Jane Smith</span>
          </li>
          <li>
            <NAvatar>BJ</NAvatar>
            <span>Bob Johnson</span>
          </li>
        </ul>
      `,
      components: {
        NAvatar,
      },
    });

    const results = await runAxe(container);
    expect(results).toHaveNoViolations();
  });

  it('should not have accessibility violations with avatars in a table', async () => {
    const { container } = render({
      template: `
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
              <td><NAvatar>JD</NAvatar></td>
              <td>John Doe</td>
              <td>Active</td>
            </tr>
            <tr>
              <td><NAvatar>JS</NAvatar></td>
              <td>Jane Smith</td>
              <td>Inactive</td>
            </tr>
          </tbody>
        </table>
      `,
      components: {
        NAvatar,
      },
    });

    const results = await runAxe(container);
    expect(results).toHaveNoViolations();
  });

  it('should not have accessibility violations with avatars in a card', async () => {
    const { container } = render({
      template: `
        <div class="card">
          <div class="card-header">
            <NAvatar>JD</NAvatar>
            <div>
              <h3>John Doe</h3>
              <p>Software Developer</p>
            </div>
          </div>
          <div class="card-content">
            <p>User profile information</p>
          </div>
        </div>
      `,
      components: {
        NAvatar,
      },
    });

    const results = await runAxe(container);
    expect(results).toHaveNoViolations();
  });

  it('should not have accessibility violations with avatars containing emojis', async () => {
    const { container } = render({
      template: `
        <div>
          <NAvatar>😀</NAvatar>
          <NAvatar>🚀</NAvatar>
          <NAvatar>⭐</NAvatar>
          <NAvatar>🔥</NAvatar>
        </div>
      `,
      components: {
        NAvatar,
      },
    });

    const results = await runAxe(container);
    expect(results).toHaveNoViolations();
  });

  it('should not have accessibility violations with avatars containing special characters', async () => {
    const { container } = render({
      template: `
        <div>
          <NAvatar>@</NAvatar>
          <NAvatar>#</NAvatar>
          <NAvatar>$</NAvatar>
          <NAvatar>%</NAvatar>
        </div>
      `,
      components: {
        NAvatar,
      },
    });

    const results = await runAxe(container);
    expect(results).toHaveNoViolations();
  });

  it('should not have accessibility violations with avatars containing numbers', async () => {
    const { container } = render({
      template: `
        <div>
          <NAvatar>1</NAvatar>
          <NAvatar>42</NAvatar>
          <NAvatar>999</NAvatar>
          <NAvatar>1K</NAvatar>
        </div>
      `,
      components: {
        NAvatar,
      },
    });

    const results = await runAxe(container);
    expect(results).toHaveNoViolations();
  });

  it('should not have accessibility violations with avatars containing long text', async () => {
    const { container } = render(NAvatar, {
      slots: { default: 'Very Long Name' },
    });

    const results = await runAxe(container);
    expect(results).toHaveNoViolations();
  });

  it('should not have accessibility violations with avatars containing mixed content', async () => {
    const { container } = render(NAvatar, {
      slots: {
        default: [
          'J',
          'D',
        ],
      },
    });

    const results = await runAxe(container);
    expect(results).toHaveNoViolations();
  });

  it('should not have accessibility violations with avatars containing unicode characters', async () => {
    const { container } = render({
      template: `
        <div>
          <NAvatar>α</NAvatar>
          <NAvatar>β</NAvatar>
          <NAvatar>γ</NAvatar>
          <NAvatar>δ</NAvatar>
        </div>
      `,
      components: {
        NAvatar,
      },
    });

    const results = await runAxe(container);
    expect(results).toHaveNoViolations();
  });

  it('should not have accessibility violations with avatars containing mixed languages', async () => {
    const { container } = render({
      template: `
        <div>
          <NAvatar>English</NAvatar>
          <NAvatar>中文</NAvatar>
          <NAvatar>日本語</NAvatar>
          <NAvatar>한국어</NAvatar>
        </div>
      `,
      components: {
        NAvatar,
      },
    });

    const results = await runAxe(container);
    expect(results).toHaveNoViolations();
  });

  it('should not have accessibility violations with avatars in a form', async () => {
    const { container } = render({
      template: `
        <form>
          <div>
            <label for="username">Username</label>
            <input id="username" type="text" />
            <NAvatar>JD</NAvatar>
          </div>
          <div>
            <label for="email">Email</label>
            <input id="email" type="email" />
            <NAvatar>JS</NAvatar>
          </div>
          <button type="submit">Submit</button>
        </form>
      `,
      components: {
        NAvatar,
      },
    });

    const results = await runAxe(container);
    expect(results).toHaveNoViolations();
  });

  it('should not have accessibility violations with avatars in a navigation', async () => {
    const { container } = render({
      template: `
        <nav>
          <ul>
            <li>
              <a href="#profile">
                <NAvatar>JD</NAvatar>
                <span>Profile</span>
              </a>
            </li>
            <li>
              <a href="#settings">
                <NAvatar>JS</NAvatar>
                <span>Settings</span>
              </a>
            </li>
          </ul>
        </nav>
      `,
      components: {
        NAvatar,
      },
    });

    const results = await runAxe(container);
    expect(results).toHaveNoViolations();
  });

  it('should not have accessibility violations with avatars in a dropdown', async () => {
    const { container } = render({
      template: `
        <div>
          <button>
            <NAvatar>JD</NAvatar>
            <span>John Doe</span>
          </button>
          <div>
            <a href="#profile">Profile</a>
            <a href="#settings">Settings</a>
            <a href="#logout">Logout</a>
          </div>
        </div>
      `,
      components: {
        NAvatar,
      },
    });

    const results = await runAxe(container);
    expect(results).toHaveNoViolations();
  });

  it('should not have accessibility violations with avatars in a sidebar', async () => {
    const { container } = render({
      template: `
        <aside>
          <div>
            <NAvatar>JD</NAvatar>
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
      `,
      components: {
        NAvatar,
      },
    });

    const results = await runAxe(container);
    expect(results).toHaveNoViolations();
  });

  it('should not have accessibility violations with avatars in a chat interface', async () => {
    const { container } = render({
      template: `
        <div>
          <div>
            <NAvatar>JD</NAvatar>
            <div>
              <span>John Doe</span>
              <p>Hello, how are you?</p>
            </div>
          </div>
          <div>
            <NAvatar>JS</NAvatar>
            <div>
              <span>Jane Smith</span>
              <p>I'm doing well, thank you!</p>
            </div>
          </div>
        </div>
      `,
      components: {
        NAvatar,
      },
    });

    const results = await runAxe(container);
    expect(results).toHaveNoViolations();
  });

  it('should not have accessibility violations with avatars in a user list', async () => {
    const { container } = render({
      template: `
        <div>
          <h2>Team Members</h2>
          <div>
            <NAvatar>JD</NAvatar>
            <div>
              <h3>John Doe</h3>
              <p>Software Developer</p>
              <p>john.doe@example.com</p>
            </div>
          </div>
          <div>
            <NAvatar>JS</NAvatar>
            <div>
              <h3>Jane Smith</h3>
              <p>Designer</p>
              <p>jane.smith@example.com</p>
            </div>
          </div>
          <div>
            <NAvatar>BJ</NAvatar>
            <div>
              <h3>Bob Johnson</h3>
              <p>Product Manager</p>
              <p>bob.johnson@example.com</p>
            </div>
          </div>
        </div>
      `,
      components: {
        NAvatar,
      },
    });

    const results = await runAxe(container);
    expect(results).toHaveNoViolations();
  });

  it('should not have accessibility violations with avatars in a comment system', async () => {
    const { container } = render({
      template: `
        <div>
          <div>
            <NAvatar>JD</NAvatar>
            <div>
              <span>John Doe</span>
              <time>2 hours ago</time>
              <p>Great article! Thanks for sharing.</p>
            </div>
          </div>
          <div>
            <NAvatar>JS</NAvatar>
            <div>
              <span>Jane Smith</span>
              <time>1 hour ago</time>
              <p>I agree, very informative.</p>
            </div>
          </div>
        </div>
      `,
      components: {
        NAvatar,
      },
    });

    const results = await runAxe(container);
    expect(results).toHaveNoViolations();
  });

  it('should not have accessibility violations with avatars in a notification system', async () => {
    const { container } = render({
      template: `
        <div>
          <div>
            <NAvatar>JD</NAvatar>
            <div>
              <span>John Doe</span>
              <p>commented on your post</p>
              <time>5 minutes ago</time>
            </div>
          </div>
          <div>
            <NAvatar>JS</NAvatar>
            <div>
              <span>Jane Smith</span>
              <p>liked your photo</p>
              <time>10 minutes ago</time>
            </div>
          </div>
        </div>
      `,
      components: {
        NAvatar,
      },
    });

    const results = await runAxe(container);
    expect(results).toHaveNoViolations();
  });
});
