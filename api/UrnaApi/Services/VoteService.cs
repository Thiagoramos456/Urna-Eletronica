using AutoMapper;
using Microsoft.EntityFrameworkCore;
using UrnaBackend.Models;
using UrnaBackend.Services.Interfaces;
using UrnaEFCore;
using UrnaEFCore.Entities;

namespace UrnaBackend.Services
{
    public class VoteService : IVoteService
    {
        private readonly UrnaContext _dbContext;

        public VoteService(UrnaContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task AddVote(int votedNumber)
        {
            var candidate = await _dbContext.Candidates.FirstOrDefaultAsync(c => c.VoteNumber == votedNumber);
            var vote = new Vote { Candidate = candidate };

            await _dbContext.Votes.AddAsync(vote);
            await _dbContext.SaveChangesAsync();
        }

        public Task<List<CandidateDto>> GetVotes()
        {
            throw new NotImplementedException();
        }
    }
}
