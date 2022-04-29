using Microsoft.EntityFrameworkCore;
using UrnaEFCore.Entities;

namespace UrnaEFCore
{
    public class UrnaContext : DbContext
    {
        public DbSet<Candidate> Candidates { get; set; }
        public DbSet<Vote> Votes { get; set; }

        public UrnaContext(DbContextOptions<UrnaContext> options) : base(options)
        { }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Candidate>().ToTable("Candidates");

            modelBuilder.Entity<Candidate>()
                .HasMany(c => c.Votes)
                .WithOne(v => v.Candidate);

            modelBuilder.Entity<Candidate>()
                .Property(c => c.CreatedAt)
                .HasDefaultValueSql("getdate()");


            modelBuilder.Entity<Vote>().ToTable("Votes");

            modelBuilder.Entity<Vote>()
                .Property(v => v.CreatedAt)
                .HasDefaultValueSql("getdate()");
        }

    }
}
