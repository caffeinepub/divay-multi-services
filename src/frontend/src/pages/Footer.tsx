export function Footer() {
  return (
    <footer
      className="border-t border-border mt-16"
      style={{ background: "oklch(0.08 0.02 250)" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-8 mb-8">
          <div className="col-span-2 sm:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <svg
                width="24"
                height="24"
                viewBox="0 0 32 32"
                fill="none"
                role="img"
                aria-label="Divay Multi Services"
              >
                <polygon
                  points="16,2 28,12 16,30 4,12"
                  fill="none"
                  stroke="oklch(0.72 0.12 75)"
                  strokeWidth="1.5"
                />
                <polygon
                  points="16,2 28,12 16,16 4,12"
                  fill="oklch(0.72 0.12 75 / 0.2)"
                  stroke="oklch(0.72 0.12 75)"
                  strokeWidth="1"
                />
              </svg>
              <span className="text-xs font-bold tracking-[0.15em] uppercase gold-text">
                Divay Multi Services
              </span>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Premium diamond investment platform with 16-level income
              structure.
            </p>
          </div>

          <FooterCol
            title="Investments"
            links={[
              "Black Diamond",
              "Blue Diamond",
              "White Diamond",
              "Commission Plan",
            ]}
          />
          <FooterCol
            title="Company"
            links={["About Us", "Our Team", "Careers", "Press"]}
          />
          <FooterCol
            title="Support"
            links={["Help Center", "Contact Us", "FAQs", "Reports"]}
          />
          <FooterCol
            title="Connect"
            links={["Facebook", "Twitter", "LinkedIn", "YouTube"]}
          />
        </div>
        <div className="border-t border-border/50 pt-4 flex flex-wrap justify-between gap-2">
          <p className="text-[10px] text-muted-foreground">
            &copy; 2024 Divay Multi Services. All rights reserved.
          </p>
          <p className="text-[10px] text-muted-foreground">
            Investment involves risk. Please read all terms carefully.
          </p>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: string[] }) {
  return (
    <div>
      <p className="text-[10px] uppercase tracking-[0.2em] font-semibold gold-text mb-3">
        {title}
      </p>
      <ul className="space-y-2">
        {links.map((link) => (
          <li key={link}>
            <span className="text-xs text-muted-foreground">{link}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
