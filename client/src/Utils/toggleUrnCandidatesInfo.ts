export default function toggleInfoDisplay (show: boolean) {
    const candidateInfoHtml = document.querySelectorAll('.after-selected');
    candidateInfoHtml.forEach((el) => {
      if (show) el.classList.remove('invisible');
      else el.classList.add('invisible');
    });
}