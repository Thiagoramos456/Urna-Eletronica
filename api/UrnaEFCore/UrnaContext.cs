using Microsoft.EntityFrameworkCore;
using UrnaEFCore.Entities;

namespace UrnaEFCore
{
    public class UrnaContext : DbContext
    {
        public DbSet<Candidate> Candidates { get; set; }

        public UrnaContext(DbContextOptions<UrnaContext> options) : base(options)
        { }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Candidate>().ToTable("Candidates");
        }

    }
}
