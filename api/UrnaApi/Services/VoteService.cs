﻿using AutoMapper;
using Microsoft.EntityFrameworkCore;
using UrnaBackend.Dtos;
using UrnaBackend.Services.Interfaces;
using UrnaEFCore;
using UrnaEFCore.Entities;

namespace UrnaBackend.Services
{
    public class VoteService : IVoteService
    {
        private readonly UrnaContext _dbContext;
        private readonly IMapper _mapper;

        public VoteService(UrnaContext dbContext, IMapper mapper)
        {
            _dbContext = dbContext;
            _mapper = mapper;
        }

        public async Task AddVote(int votedNumber)
        {
            var candidate = await _dbContext.Candidates.FirstOrDefaultAsync(c => c.VoteNumber == votedNumber);
            var vote = new Vote { Candidate = candidate };

            await _dbContext.Votes.AddAsync(vote);
            await _dbContext.SaveChangesAsync();
        }

        public async Task<List<CandidateDashboardDto>> GetVotes()
        {
            var candidatesWithVotes = await _dbContext.Candidates.Include(c => c.Votes).ToListAsync();

            var mappedModelCandidates = candidatesWithVotes.Select(candidate => _mapper.Map<CandidateDashboardDto>(candidate)).ToList();

            foreach (var candidate in mappedModelCandidates)
            {
                candidate.VoteCount = candidatesWithVotes.FirstOrDefault(c => c.Id == candidate.Id)?.Votes?.Count;
            }

            return mappedModelCandidates.ToList();

        }
    }
}
