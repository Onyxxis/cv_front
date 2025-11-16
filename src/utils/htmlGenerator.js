export function generateHTML(blocks, userData) {
  let html = `<div style="font-family:sans-serif">`;
  blocks.forEach((block) => {
    switch (block.type) {
      case "personal_info":
        html += `
          <div>
            <h2>${userData.first_name} ${userData.last_name}</h2>
            <p>${userData.job_title || ""}</p>
            <p>${userData.email} • ${userData.phone}</p>
          </div>
        `;
        break;
      case "experience":
        userData.experiences?.forEach((exp) => {
          html += `
            <div>
              <strong>${exp.position}</strong> chez ${exp.company}
              <p>${exp.description || ""}</p>
            </div>
          `;
        });
        break;
      case "divider":
        html += `<hr />`;
        break;
      // Ajouter les autres blocs ici...
    }
  });
  html += "</div>";
  return html;
}
