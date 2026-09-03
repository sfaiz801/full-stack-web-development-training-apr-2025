const container = document.getElementById('textContainer');

container.addEventListener('click', function(event) {
  // Check if a <p> element was clicked
  if (event.target.tagName === 'P') {
    const p = event.target;
    
    // Toggle highlight class
    const isHighlighted = p.classList.toggle('highlight');
    
    // Get current click count from custom attribute, convert to number
    let count = Number(p.getAttribute('data-clickcount'));
    
    if (isHighlighted) {
      // Increase count only when highlighting the paragraph
      count++;
      p.setAttribute('data-clickcount', count);
    }
    
    // Remove existing click count text at the end
    // We can store original text separately or reconstruct text from original + count
    
    // Get original text without count (everything before '(')
    const originalText = p.textContent.split(' (Clicked')[0];
    
    // Update paragraph text with new count if highlighted, else no count shown
    if (isHighlighted) {
      p.textContent = `${originalText} (Clicked ${count} times)`;
    } else {
      // If unhighlighted, remove count display
      p.textContent = originalText;
    }
  }
});
