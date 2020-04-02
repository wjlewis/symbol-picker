import React from 'react';
import './index.css';
import segments from './segments';
import Header from '../header';
import Segment from '../segment';

interface AppProps {}

interface AppState {
  bannerTimeout?: number;
  title: string;
}

class App extends React.Component<AppProps> {
  private readonly defaultTitle = 'Click a glyph to copy it to your clipboard';

  state = {
    bannerTimeout: undefined,
    title: this.defaultTitle,
  };

  render() {
    return (
      <div className="app">
        <Header content={this.state.title} />
        {segments.map(({ title, glyphs }) => (
          <Segment
            key={title}
            title={title}
            glyphs={glyphs}
            onClick={this.copyGlyph}
          />
        ))}
      </div>
    );
  }

  private copyGlyph = (glyph: string): void => {
    const wasSuccess = this.copyToClipboard(glyph);
    if (this.state.bannerTimeout) clearTimeout(this.state.bannerTimeout);
    this.setState({
      title: wasSuccess
        ? `Copied ${glyph} to clipboard!`
        : `Unable to copy ${glyph} to clipboard :(`,
      bannerTimeout: setTimeout(
        () =>
          this.setState({
            title: this.defaultTitle,
          }),
        1500,
      ),
    });
  };

  private copyToClipboard(glyph: string): boolean {
    const text = document.createElement('textarea');
    text.innerHTML = glyph;
    text.style.top = '0';
    text.style.left = '0';
    text.style.position = 'fixed';
    document.body.appendChild(text);
    text.focus();
    text.select();
    const wasSuccess = document.execCommand('copy');
    document.body.removeChild(text);
    return wasSuccess;
  }
}

export default App;
