import UiIcon from './UiIcon';

export default function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return diagonal ? <UiIcon name="external" /> : <span aria-hidden="true">→</span>;
}
